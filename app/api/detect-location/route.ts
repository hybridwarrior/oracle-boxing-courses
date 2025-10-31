import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get client IP from request headers
    const forwarded = request.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : request.headers.get('x-real-ip') || '';

    // Check for localhost/reserved IPs
    const isLocalhost = !clientIp || clientIp === '::1' || clientIp === '127.0.0.1' || clientIp.startsWith('192.168.') || clientIp.startsWith('10.') || clientIp.startsWith('172.');

    if (isLocalhost) {
      console.log('Local/reserved IP detected, using fallback');
      // For testing: check for test query param
      const testCountry = request.nextUrl.searchParams.get('test_country');
      if (testCountry) {
        console.log('Test mode: Using country', testCountry);
        return NextResponse.json({ country_code: testCountry.toUpperCase() });
      }
      // Default to US for localhost
      return NextResponse.json({ country_code: 'US' });
    }

    console.log('Detecting location for IP:', clientIp);

    // Use ipapi.co with client IP
    const url = `https://ipapi.co/${clientIp}/json/`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'oracleboxing.com/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`ipapi.co returned ${response.status}, using fallback`);
      return NextResponse.json({ country_code: 'US' });
    }

    const data = await response.json();

    // Check for errors
    if (data.error) {
      console.warn('ipapi.co error:', data.reason || 'Unknown error');
      return NextResponse.json({ country_code: 'US' });
    }

    console.log('Location detected:', data.country_code);

    return NextResponse.json({
      country_code: data.country_code,
      country_name: data.country_name,
      city: data.city,
    });
  } catch (error) {
    console.error('Location detection error:', error);
    return NextResponse.json({ country_code: 'US' });
  }
}
