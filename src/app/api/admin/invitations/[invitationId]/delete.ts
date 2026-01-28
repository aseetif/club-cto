import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";

export async function deleteInvitation(
  request: Request,
  context: { params: Promise<{ invitationId: string }> }
) {
  const { invitationId } = await context.params;

  const { error } = await supabaseAdmin
    .from("invitations")
    .delete()
    .eq("id", Number(invitationId));

  if (error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Invitation supprimée" });
}
