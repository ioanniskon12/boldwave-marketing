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

    let sentCount = 0;
    const errorCount = 0;

    // Simulation mode - log emails that would be sent
    // To enable actual sending:
    // 1. Install: npm install resend (or @sendgrid/mail)
    // 2. Set RESEND_API_KEY or SENDGRID_API_KEY in environment
    // 3. Uncomment the email sending code below

    console.log(`Sending campaign "${campaign.name}" to ${subscribers.length} subscribers...`);

    for (const subscriber of subscribers) {
      const personalizedHtml = personalizeEmail(
        campaign.html_content as string,
        subscriber as { email: string; name: string | null },
        campaignId
      );

      console.log(`[SIMULATION] Would send to: ${subscriber.email}`);
      console.log(`Subject: ${campaign.subject}`);

      // TODO: Uncomment when email provider is configured
      // const resendApiKey = process.env.RESEND_API_KEY;
      // if (resendApiKey) {
      //   const { Resend } = await import('resend');
      //   const resend = new Resend(resendApiKey);
      //   await resend.emails.send({
      //     from: process.env.EMAIL_FROM || 'newsletter@owlmarketinghub.com',
      //     to: subscriber.email,
      //     subject: campaign.subject,
      //     html: personalizedHtml,
      //   });
      // }

      sentCount++;
    }

    // Update campaign status
    const now = Date.now();
    await supabase
      .from('email_campaigns')
      .update({
        status: 'sent',
        sent_at: new Date(now).toISOString(),
        sent_count: sentCount,
        total_recipients: subscribers.length,
      } as never)
      .eq('id', campaignId);

    return NextResponse.json({
      success: true,
      sentCount,
      errorCount,
      totalRecipients: subscribers.length,
      mode: 'simulation',
      message: 'Campaign recorded. Configure email provider to send actual emails.',
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
  const now = Date.now();

  return html
    .replace(/{{subscriber_name}}/g, subscriber.name || 'there')
    .replace(/{{subscriber_email}}/g, subscriber.email)
    .replace(/{{unsubscribe_link}}/g, unsubscribeLink)
    .replace(/{{current_date}}/g, new Date(now).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }));
}
