import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

// Initialize the Search Console API client
async function getSearchConsoleClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const authClient = await auth.getClient();
  return google.searchconsole({ version: 'v1', auth: authClient as any });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || getDefaultStartDate();
    const endDate = searchParams.get('endDate') || getDefaultEndDate();
    const dimension = searchParams.get('dimension') || 'page'; // page, query, country, device

    const searchConsole = await getSearchConsoleClient();
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL;

    if (!siteUrl) {
      return NextResponse.json(
        { error: 'Site URL not configured' },
        { status: 500 }
      );
    }

    // Fetch search analytics data
    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: [dimension],
        rowLimit: 100,
      },
    });

    const rows = response.data.rows || [];

    // Transform the data
    const data = rows.map((row) => ({
      key: row.keys?.[0] || '',
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr ? (row.ctr * 100).toFixed(2) : '0.00',
      position: row.position?.toFixed(1) || '0.0',
    }));

    // Calculate totals
    const totals = rows.reduce(
      (acc: { clicks: number; impressions: number }, row) => ({
        clicks: acc.clicks + (row.clicks || 0),
        impressions: acc.impressions + (row.impressions || 0),
      }),
      { clicks: 0, impressions: 0 }
    );

    return NextResponse.json({
      data,
      totals: {
        ...totals,
        ctr: totals.impressions > 0
          ? ((totals.clicks / totals.impressions) * 100).toFixed(2)
          : '0.00',
      },
      startDate,
      endDate,
    });
  } catch (error: any) {
    console.error('Search Console API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch Search Console data',
        details: error.message
      },
      { status: 500 }
    );
  }
}

function getDefaultStartDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 28); // Last 28 days
  return date.toISOString().split('T')[0];
}

function getDefaultEndDate(): string {
  const date = new Date();
  date.setDate(date.getDate() - 2); // Data is typically 2 days delayed
  return date.toISOString().split('T')[0];
}
