import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = (() => {
  try {
    // In development on Replit
    if (typeof window !== 'undefined' && (
      window.location.hostname.includes('replit.dev') ||
      window.location.hostname.includes('repl.co') ||
      window.location.hostname.includes('replit.app')
    )) {
      const replitUrl = window.location.origin;
      console.log('Using Replit URL:', replitUrl);
      console.log('Using Replit API URL:', replitUrl);
      return replitUrl;
    }

    // In production, use the same origin as the current page
    if (import.meta.env.PROD) {
      return window.location.origin;
    }

    // Default development fallback
    return 'http://localhost:5000';
  } catch (error) {
    console.error('Error determining API base URL:', error);
    return 'http://localhost:5000';
  }
})();

export { API_BASE_URL };

// Create a function to initialize the query client to avoid hoisting issues
function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (renamed from cacheTime)
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors except for 408, 429
          if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error.status)) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
        refetchOnWindowFocus: false, // Disable for Replit environment
        refetchOnMount: true,
        refetchOnReconnect: true,
        networkMode: 'online', // Only run queries when online
      },
      mutations: {
        retry: 1,
        networkMode: 'online',
      },
    },
  });
}

// Export the query client instance
export const queryClient = createQueryClient();

export async function apiRequest(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  data?: any,
  headers?: Record<string, string>
): Promise<Response> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      credentials: 'include',
    };

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);

    // Add response status to error for better error handling
    if (!response.ok) {
      const error = new Error(`HTTP ${response.status}: ${response.statusText}`) as any;
      error.status = response.status;
      error.response = response;
      throw error;
    }

    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}
