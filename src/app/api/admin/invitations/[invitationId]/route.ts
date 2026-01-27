import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ invitationId: string }> }
) {
  const { status } = await request.json();
  const { invitationId } = await context.params; // ✅ ici

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json(
      { ok: false, message: "Statut invalide" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("invitations")
    .update({ status })
    .eq("id", Number(invitationId)) // ✅ ici aussi
    .select();

  console.log("updated data:", data);
  console.log("update error:", error);

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Aucune ligne mise à jour" },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, message: "Statut mis à jour" });
}


export async function DELETE(
  _request: Request,
  context: { params: Promise<{ invitationId: string }> }
) {
  const { invitationId } = await context.params;

  const { error } = await supabaseAdmin
    .from("invitations")
    .delete()
    .eq("id", Number(invitationId));

  if (error) {
    console.error("delete error:", error);
    return NextResponse.json(
      { ok: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}