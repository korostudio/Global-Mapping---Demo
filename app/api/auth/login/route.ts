import { NextResponse } from "next/server";

const DEMO_EMAIL = "admin@globalmapping.biz";
const DEMO_PASSWORD = "demo1234";
const DEMO_TOKEN = "gm-demo-token-2026";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return NextResponse.json({ ok: true, token: DEMO_TOKEN, user: DEMO_EMAIL });
  }

  return NextResponse.json(
    { ok: false, error: "Credenciales incorrectas" },
    { status: 401 }
  );
}
