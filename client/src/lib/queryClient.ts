import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = (() => {
  try {
    // In production, use the same origin as the current page
    if (import.meta.env.PROD) {
      return window.location.origin;
    }

    // In development on Replit
    if (typeof window !== 'undefined' && window.location.hostname.includes('replit.dev')) {
      const replitUrl = window.location.origin;
      console.log('Using Replit URL:', replitUrl);
      console.log('Using Replit API URL:', replitUrl);
      return replitUrl;
    }

    // Default development fallback
    return 'http://localhost:5000';
  } catch (error) {
    console.error('Error determining API base URL:', error);
    return 'http://localhost:5000';
  }
})();

export { API_BASE_URL };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        // Don't retry mutations on client errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

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
