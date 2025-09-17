
// Cloudflare Pages middleware for SPA routing and API proxying
export const onRequest = async (context: any) => {
  const url = new URL(context.request.url);
  const { request } = context;
  
  console.log('🔧 Cloudflare middleware:', {
    method: request.method,
    pathname: url.pathname,
    origin: url.origin
  });
  
  // Handle CORS preflight for all requests
  if (request.method === 'OPTIONS') {
    console.log('✈️ Handling CORS preflight');
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, user-id, Cookie',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    });
  }
  
  // Proxy API routes to Render backend
  if (url.pathname.startsWith('/api/')) {
    const backendUrl = 'https://projectnow.onrender.com' + url.pathname + url.search;
    console.log('🔄 Proxying API request to:', backendUrl);
    
    // Create headers object and copy from original request
    const headers = new Headers();
    for (const [key, value] of request.headers.entries()) {
      headers.set(key, value);
    }
    
    // Ensure proper origin is set
    headers.set('Origin', 'https://projectnow.onrender.com');
    headers.set('Referer', 'https://jobport.ramdegala3.workers.dev');
    
    const backendRequest = new Request(backendUrl, {
      method: request.method,
      headers: headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    });
    
    try {
      const response = await fetch(backendRequest);
      console.log('✅ Backend response status:', response.status);
      
      // Create response with proper CORS headers
      const responseHeaders = new Headers(response.headers);
      responseHeaders.set('Access-Control-Allow-Origin', '*');
      responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, user-id, Cookie');
      responseHeaders.set('Access-Control-Allow-Credentials', 'true');
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
      });
    } catch (error) {
      console.error('❌ Backend request failed:', error);
      return new Response(JSON.stringify({ 
        error: 'Backend unavailable',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, user-id, Cookie',
        }
      });
    }
  }
  
  // For SPA routes (non-API, non-static files), serve index.html
  const staticFileExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
  const isStaticFile = staticFileExtensions.some(ext => url.pathname.endsWith(ext));
  const isApiRoute = url.pathname.startsWith('/api/');
  
  if (!isStaticFile && !isApiRoute && url.pathname !== '/') {
    console.log('📄 SPA route detected, serving index.html for:', url.pathname);
    // Let Cloudflare Pages handle SPA routing by continuing to next middleware
    return context.next();
  }
  
  // For all other requests, let Cloudflare Pages handle them normally
  console.log('📄 Static file or root, letting Cloudflare Pages handle:', url.pathname);
  return context.next();
};
