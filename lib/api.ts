const BASE_URL = "http://localhost:5000/api";

export async function apiRequest(
  endpoint: string,
  method: string = "GET",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any,
  token?: string
) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return res.json();
}
