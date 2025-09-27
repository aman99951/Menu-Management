import { BACKEND_URL } from '../../../config';

export async function GET(_, { params }) {
  const res = await fetch(`${BACKEND_URL}/menus/${params.id}/tree`, { cache: 'no-store' });
  return new Response(await res.text(), { status: res.status, headers: res.headers });
}
