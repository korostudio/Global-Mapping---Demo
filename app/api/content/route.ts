import { NextResponse } from "next/server";
import content from "@/lib/content";

export async function GET() {
  return NextResponse.json({ ok: true, data: content });
}

export async function PUT(req: Request) {
  const body = await req.json();
  // In production this will persist to Supabase.
  // For the demo, we echo back the received data as if it were saved.
  return NextResponse.json({
    ok: true,
    data: body,
    message: "Cambios guardados (modo demo — Supabase pendiente)",
  });
}
