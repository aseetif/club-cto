import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { resend } from "@/lib/resendClient"; // si tu l'utilises pour l'email
import { sendInvitationEmail } from "../email";

export async function patchInvitation(
  request: Request,
  context: { params: Promise<{ invitationId: string }> }
) {
  const { status } = await request.json();
  const { invitationId } = await context.params;

  if (!["approved", "rejected"].includes(status)) {
    return NextResponse.json(
      { ok: false, message: "Statut invalide" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("invitations")
    .update({ status })
    .eq("id", Number(invitationId))
    .select()
    .single();

  if (error || !data) {
    return NextResponse.json(
      { ok: false, message: error?.message ?? "Update failed" },
      { status: 500 }
    );
  }

  const loginLink =
  status === "approved"
    ? `https://clubcto.fr/login?token=${data.id}-${Date.now()}`
    : undefined;

  const eventLink =
  status === "approved"
    ? "https://calendly.com/club-cto/meeting"
    : undefined;

  await sendInvitationEmail(
  data.email,
  data.name ?? "",
  status,
  loginLink,
  eventLink
);

  return NextResponse.json({ ok: true, message: "Statut mis à jour" });
}
