const getApiUrl = () => {
  // PRIORITY 1: Use environment variable if available
  if (import.meta.env.VITE_API_BASE_URL) {
    console.log('Using API URL from environment:', import.meta.env.VITE_API_BASE_URL);
    return import.meta.env.VITE_API_BASE_URL;
  }

  // PRIORITY 2: For production/deployment environments - always use same origin
  if (window.location.protocol === 'https:' || 
      window.location.hostname.includes('replit.dev') || 
      window.location.hostname.includes('repl.co') || 
      window.location.hostname.includes('replit.app') ||
      window.location.hostname.includes('pike.replit.dev') ||
      window.location.hostname.includes('projectnow.pages.dev') ||
      window.location.hostname.includes('replit-deployed') ||
      window.location.port === '') {
    const apiUrl = window.location.origin;
    console.log('Using deployment API URL:', apiUrl);
    return apiUrl;
  }

  // PRIORITY 3: For localhost development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('Using localhost API URL: http://localhost:5000');
    return "http://localhost:5000";
  }

  // PRIORITY 4: Fallback for any other cases
  const sameOriginUrl = window.location.origin;
  console.log('Using fallback API URL:', sameOriginUrl);
  return sameOriginUrl;
};

const API_URL = getApiUrl();

export async function apiRequest(method: string, endpoint: string, data?: any, customHeaders?: Record<string, string>) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...customHeaders,
  };

  const options: RequestInit = {
    method,
    credentials: "include",
    headers,
    mode: "cors" as RequestMode,
    cache: "no-cache" as RequestCache,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  console.log(`[API] ${method} ${url}`);
  console.log('[API] Request data:', data);
  console.log('[API] Headers:', headers);
  console.log('[API] Full URL being called:', url);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // Increased timeout for deployment
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log(`[API] Response: ${method} ${url} - Status: ${response.status}`);
    console.log('[API] Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.error(`[API] Error: ${method} ${url} - ${response.status}`);
      let errorMessage = `HTTP error! status: ${response.status}`;
      
      try {
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          console.error('[API] Error data:', errorData);
        } else {
          const errorText = await response.text();
          console.error('[API] Error text:', errorText);
          if (errorText && errorText.length > 0) {
            errorMessage = errorText;
          }
        }
      } catch (parseError) {
        console.error('[API] Could not parse error response:', parseError);
        errorMessage = `Request failed with status: ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    console.error(`[API] Network error for ${method} ${url}:`, error);
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please try again');
      }
      throw error;
    }
    throw new Error('Network request failed');
  }
}
