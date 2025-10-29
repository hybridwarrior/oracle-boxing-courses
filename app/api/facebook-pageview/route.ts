import { NextRequest, NextResponse } from 'next/server';

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1474540100541059';
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || '';
const FB_CONVERSIONS_API_URL = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event_id, session_id, page_url, fbclid } = body;

    // Get client IP from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || '';

    // Get user agent
    const userAgent = request.headers.get('user-agent') || '';

    const eventTime = Math.floor(Date.now() / 1000);

    const eventData = {
      event_name: 'PageView',
      event_time: eventTime,
      event_id: event_id,
      event_source_url: page_url,
      action_source: 'website',
      user_data: {
        client_ip_address: clientIp,
        client_user_agent: userAgent,
        ...(fbclid && { fbc: `fb.1.${eventTime * 1000}.${fbclid}` }),
      },
      custom_data: {
        session_id: session_id,
      },
    };

    const payload = {
      data: [eventData],
      access_token: FB_ACCESS_TOKEN,
      test_event_code: 'TEST85396',
    };

    console.log('📊 Sending PageView to Facebook CAPI:', {
      event_id,
      session_id,
      page_url,
      clientIp,
      userAgent: userAgent.substring(0, 50) + '...',
    });

    const response = await fetch(FB_CONVERSIONS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook CAPI PageView error:', result);
      return NextResponse.json(
        { success: false, error: result },
        { status: response.status }
      );
    }

    console.log('Facebook CAPI PageView success:', result);
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending PageView to Facebook CAPI:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
