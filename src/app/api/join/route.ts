import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, message: "Email invalide" },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin.from("invitations").insert({ email });

  if (error && "code" in error && error.code === "23505") {
    return NextResponse.json(
      { ok: false, message: "Email déjà inscrit" },
      { status: 409 }
    );
  }

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { ok: true, message: "Email ajouté 👍" }
  );
}
