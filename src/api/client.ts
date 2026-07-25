const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

interface ApiError {
  status?: number;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  init?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const error = body as ApiError | null;

	  throw new Error(
		// If the API returns an error message, use it; otherwise, use the status text
      `Erreur ${response.status} : ${error?.error ?? response.statusText}`
    );
  }

  return body as T;
}

export { fetchApi };
