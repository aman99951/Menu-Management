import { BACKEND_URL } from "../config";

export async function GET() {
  const res = await fetch(`${BACKEND_URL}/menus`, { cache: "no-store" });
  return new Response(await res.text(), { status: res.status, headers: res.headers });
}

export async function POST(req: Request) {
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/menus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return new Response(await res.text(), { status: res.status, headers: res.headers });
}
