export async function fetcher<T>(url: string): Promise<T | null> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const result = await res.json();
  return result;
}
