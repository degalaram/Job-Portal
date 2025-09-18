const getApiUrl = () => {
  // PRIORITY 1: Use environment variable if available (Cloudflare Pages with VITE_API_BASE_URL)
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log('Using API URL from environment:', import.meta.env.VITE_API_BASE_URL);
    return import.meta.env.VITE_API_BASE_URL;
  }

  // PRIORITY 2: For Replit development environment
  if (window.location.hostname.includes('replit.dev') || 
      window.location.hostname.includes('repl.co') || 
      window.location.hostname.includes('replit.app')) {
    const apiUrl = `${window.location.protocol}//${window.location.hostname}`;
    console.log('Using Replit API URL:', apiUrl);
    return apiUrl;
  }

  // PRIORITY 3: For localhost development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Using localhost API URL: http://localhost:5000');
    return "http://localhost:5000";
  }

  // PRIORITY 4: For same domain deployments (most production cases)
  if (window.location.hostname !== 'localhost') {
    const sameOriginUrl = window.location.origin;
    console.log('Using same origin API URL:', sameOriginUrl);
    return sameOriginUrl;
  }

  // PRIORITY 5: Fallback
  console.log('Using fallback API URL');
  return "";
};

const API_URL = getApiUrl();

export async function apiRequest(method: string, endpoint: string, data?: any, customHeaders?: Record<string, string>) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    credentials: "include", // CRITICAL: Required for session management
    headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  console.log(`API Request: ${method} ${url}`);
  
  const response = await fetch(url, options);

  if (!response.ok) {
    console.error(`API Error: ${method} ${url} - ${response.status}`);
    // Clone response to avoid "body stream already read" error
    const responseClone = response.clone();
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    } catch {
      try {
        const errorText = await responseClone.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      } catch {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }
  }

  return response;
}
