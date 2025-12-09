/**
 * Base API configuration
 */

// WordPress API URL - Temporary Hostinger URL (update to ourartworks.store once DNS works)
const WORDPRESS_API_URL = "https://ourartworks-store-710680.hostingersite.com/wp-json/oaw/v1";
const WOOCOMMERCE_API_URL = "https://ourartworks-store-710680.hostingersite.com/wp-json/wc/store/v1";

/**
 * Base fetch wrapper with error handling
 */
async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `API Error: ${response.status}`);
  }

  return response.json();
}

/**
 * WordPress REST API client
 */
export const wordpressApi = {
  baseUrl: WORDPRESS_API_URL,
  
  async get<T>(endpoint: string): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${endpoint}`);
  },
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

/**
 * WooCommerce Store API client
 */
export const wooCommerceApi = {
  baseUrl: WOOCOMMERCE_API_URL,
  
  async get<T>(endpoint: string): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${endpoint}`);
  },
  
  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

export { WORDPRESS_API_URL, WOOCOMMERCE_API_URL };
