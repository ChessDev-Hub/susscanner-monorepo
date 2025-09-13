const API_BASE = import.meta.env.VITE_API_BASE || '${API_BASE}';
const API =
  (import.meta as any).env?.VITE_API_URL ?? "http://127.0.0.1:8000";

export async function scan(username: string) {
  const r = await fetch(`${API}/scan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}
