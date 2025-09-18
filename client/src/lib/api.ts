const getApiUrl = () => {
  // PRIORITY 1: Use environment variable if available (Cloudflare Pages with VITE_API_BASE_URL)
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log('Using API URL from environment:', import.meta.env.VITE_API_BASE_URL);
    return import.meta.env.VITE_API_BASE_URL;
  }

  // PRIORITY 2: For Replit production/development environment
  if (window.location.hostname.includes('replit.dev') || 
      window.location.hostname.includes('repl.co') || 
      window.location.hostname.includes('replit.app') ||
      window.location.hostname.includes('pike.replit.dev') ||
      window.location.hostname.includes('projectnow.pages.dev')) {
    const apiUrl = window.location.origin;
    console.log('Using Replit/Pages API URL:', apiUrl);
    return apiUrl;
  }

  // PRIORITY 3: For localhost development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Using localhost API URL: http://localhost:5000');
    return "http://localhost:5000";
  }

  // PRIORITY 4: For same domain deployments (most production cases)
  const sameOriginUrl = window.location.origin;
  console.log('Using same origin API URL:', sameOriginUrl);
  return sameOriginUrl;
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

  console.log(`API Request: ${method} ${url}`, data ? 'with data' : 'without data');
  if (customHeaders) {
    console.log('Custom headers:', customHeaders);
  }
  
  try {
    const response = await fetch(url, options);
    console.log(`API Response: ${method} ${url} - Status: ${response.status}`);

    if (!response.ok) {
      console.error(`API Error: ${method} ${url} - ${response.status}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        // Clone the response to avoid consuming the stream
        const responseClone = response.clone();
        const errorData = await responseClone.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        console.error('Error data:', errorData);
      } catch (jsonError) {
        console.error('Could not parse error response as JSON:', jsonError);
        try {
          // Try to read as text from the original response
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        } catch (textError) {
          console.error('Could not read error response as text:', textError);
          // Use the default error message
        }
      }
      
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error(`Network error for ${method} ${url}:`, error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network request failed');
  }
}
