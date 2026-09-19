import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const PIXEL_ID = '1762585868316313';
    const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

    if (!ACCESS_TOKEN) {
      // If token is missing, fail silently to avoid breaking the client UI
      console.warn('META_CAPI_TOKEN is missing. Server-side tracking disabled.');
      return NextResponse.json({ success: true, warning: 'Token missing' });
    }

    const body = await req.json();
    const { eventName, sourceUrl, customData } = body;

    // Extract client IP and user agent for high-fidelity matching
    const ip = req.headers.get('x-forwarded-for') || req.ip || '0.0.0.0';
    const userAgent = req.headers.get('user-agent') || '';

    // Extract fbp/fbc cookies directly from the request headers
    const cookieHeader = req.headers.get('cookie') || '';
    const extractCookie = (name) => {
      const match = cookieHeader.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? match[2] : undefined;
    };
    
    const fbp = extractCookie('_fbp');
    const fbc = extractCookie('_fbc');

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          action_source: 'website',
          event_source_url: sourceUrl,
          user_data: {
            client_ip_address: ip.split(',')[0].trim(),
            client_user_agent: userAgent,
            ...(fbp && { fbp }),
            ...(fbc && { fbc }),
          },
          ...(customData && { custom_data: customData })
        }
      ]
    };

    const response = await fetch(`https://graph.facebook.com/v19.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Meta CAPI Error:', result);
      return NextResponse.json({ success: false, error: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('CAPI Server Error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
