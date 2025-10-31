import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1474540100541059';
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN || '';
const FB_CONVERSIONS_API_URL = `https://graph.facebook.com/v18.0/${FB_PIXEL_ID}/events`;

/**
 * Hash a string using SHA-256 for Facebook Conversions API
 */
async function hashSHA256(text: string): Promise<string> {
  const normalized = text.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      event_id,
      value,
      currency,
      content_ids,
      contents,
      customer_email,
      customer_phone,
      cookie_data,
      fbclid,
      session_url,
    } = body;

    console.log('📊 Received Purchase event request:', {
      event_id,
      value,
      currency,
      content_ids,
      contents_count: contents?.length || 0,
      customer_email: customer_email ? '✓ ' + customer_email : '✗',
      customer_phone: customer_phone ? '✓' : '✗',
      cookie_data_present: !!cookie_data,
      cookie_data_keys: cookie_data ? Object.keys(cookie_data) : [],
      fbclid: fbclid ? '✓' : '✗',
    });

    const eventTime = Math.floor(Date.now() / 1000);

    // Get client IP from request headers
    const forwarded = req.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || '';

    // Get user agent
    const userAgent = req.headers.get('user-agent') || '';

    // Build custom_data with cookie tracking data
    const customData: Record<string, any> = {
      value,
      currency,
      content_ids,
      content_type: 'product',
      num_items: contents?.length || content_ids?.length || 0,
      contents: contents || content_ids?.map((id: string) => ({ id, quantity: 1 })) || [],
    };

    // Add cookie data fields to custom_data (max 500 chars each)
    if (cookie_data && typeof cookie_data === 'object') {
      Object.keys(cookie_data).forEach(key => {
        // Skip user_agent - it's already in user_data section
        if (key === 'user_agent') {
          return;
        }

        const value = cookie_data[key];
        if (value !== null && value !== undefined) {
          const stringValue = String(value);
          customData[key] = stringValue.length > 500 ? stringValue.substring(0, 500) : stringValue;
        }
      });
    }

    // Build user_data with customer information
    const userData: Record<string, any> = {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    };

    // Add hashed customer email if available
    if (customer_email) {
      try {
        const hashedEmail = await hashSHA256(customer_email);
        userData.em = [hashedEmail];
      } catch (error) {
        console.warn('Failed to hash email for Facebook CAPI:', error);
      }
    }

    // Add hashed customer phone if available
    if (customer_phone) {
      try {
        const cleanPhone = customer_phone.replace(/[^0-9]/g, '');
        const hashedPhone = await hashSHA256(cleanPhone);
        userData.ph = [hashedPhone];
      } catch (error) {
        console.warn('Failed to hash phone for Facebook CAPI:', error);
      }
    }

    // Add fbclid as fbc parameter if available
    if (fbclid) {
      userData.fbc = `fb.1.${eventTime * 1000}.${fbclid}`;
    }

    // Build Facebook event
    const fbEventData = {
      event_name: 'Purchase',
      event_time: eventTime,
      event_id,
      event_source_url: session_url || 'https://oracleboxing.com/success',
      action_source: 'website',
      user_data: userData,
      custom_data: customData,
    };

    const fbPayload = {
      data: [fbEventData],
      access_token: FB_ACCESS_TOKEN,
    };

    console.log('📊 Sending Purchase to Facebook CAPI:', {
      event_id,
      value: customData.value,
      currency: customData.currency,
      content_ids: customData.content_ids,
      num_items: customData.num_items,
      custom_data_keys: Object.keys(customData),
      customer_email_hashed: !!userData.em,
      customer_phone_hashed: !!userData.ph,
    });

    const fbResponse = await fetch(FB_CONVERSIONS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fbPayload),
    });

    const fbResult = await fbResponse.json();

    if (!fbResponse.ok) {
      console.error('❌ Facebook CAPI Purchase error:', fbResult);
      return NextResponse.json(
        { success: false, error: fbResult },
        { status: fbResponse.status }
      );
    }

    console.log('✅ Facebook CAPI Purchase success:', fbResult);
    return NextResponse.json({ success: true, result: fbResult });

  } catch (error) {
    console.error('❌ Failed to send Purchase to Facebook CAPI:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
