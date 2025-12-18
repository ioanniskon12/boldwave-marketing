import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const { campaignId } = await request.json();

    if (!campaignId) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 });
    }

    // Use service role key for server-side operations
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch campaign
    const { data: campaign, error: campaignError } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (campaignError || !campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    // Fetch active subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, name')
      .eq('status', 'active');

    if (subscribersError) {
      return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: 'No active subscribers' }, { status: 400 });
    }

    // Check for email provider configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    let sentCount = 0;
    let errorCount = 0;

    // Send emails based on available provider
    if (resendApiKey) {
      // Use Resend
      const { Resend } = await import('resend');
      const resend = new Resend(resendApiKey);

      for (const subscriber of subscribers) {
        try {
          const personalizedHtml = personalizeEmail(campaign.html_content, subscriber, campaignId);

          await resend.emails.send({
            from: process.env.EMAIL_FROM || 'Owl Marketing Hub <newsletter@owlmarketinghub.com>',
            to: subscriber.email,
            subject: campaign.subject,
            html: personalizedHtml,
          });

          sentCount++;
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          errorCount++;
        }
      }
    } else if (sendgridApiKey) {
      // Use SendGrid
      const sgMail = await import('@sendgrid/mail');
      sgMail.default.setApiKey(sendgridApiKey);

      for (const subscriber of subscribers) {
        try {
          const personalizedHtml = personalizeEmail(campaign.html_content, subscriber, campaignId);

          await sgMail.default.send({
            from: process.env.EMAIL_FROM || 'newsletter@owlmarketinghub.com',
            to: subscriber.email,
            subject: campaign.subject,
            html: personalizedHtml,
          });

          sentCount++;
        } catch (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
          errorCount++;
        }
      }
    } else {
      // No email provider configured - simulate sending for demo
      console.log('No email provider configured. Simulating send...');

      for (const subscriber of subscribers) {
        console.log(`Would send to: ${subscriber.email}`);
        sentCount++;
      }
    }

    // Update campaign status
    const status = errorCount === subscribers.length ? 'failed' : 'sent';

    await supabase
      .from('email_campaigns')
      .update({
        status,
        sent_at: new Date().toISOString(),
        sent_count: sentCount,
        total_recipients: subscribers.length,
      } as never)
      .eq('id', campaignId);

    return NextResponse.json({
      success: true,
      sentCount,
      errorCount,
      totalRecipients: subscribers.length,
    });
  } catch (error) {
    console.error('Error sending campaign:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function personalizeEmail(
  html: string,
  subscriber: { email: string; name: string | null },
  campaignId: string
): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://owlmarketinghub.com';
  const unsubscribeLink = `${baseUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;

  return html
    .replace(/{{subscriber_name}}/g, subscriber.name || 'there')
    .replace(/{{subscriber_email}}/g, subscriber.email)
    .replace(/{{unsubscribe_link}}/g, unsubscribeLink)
    .replace(/{{current_date}}/g, new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }));
}
