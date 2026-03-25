import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/isAdmin";


export async function GET() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    return NextResponse.json(
      { ok: false, message: "Forbidden" },
      { status: 403 }
    );
  }

  const { data, error } = await supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, data });
}
