import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json(
      { ok: false, message: "Email invalide" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("invitations").insert({ email });

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
