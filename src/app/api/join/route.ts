import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, message: "Email invalide" }, { status: 400 });
  }

  return NextResponse.json({ ok: true, message: "Email reçu 👍" });
}
