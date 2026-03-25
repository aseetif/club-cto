import { NextResponse } from "next/server";
import { handleInvitationDecision } from "@/services/invitationService";

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

await handleInvitationDecision(Number(invitationId), status);

  return NextResponse.json({ ok: true });
}
