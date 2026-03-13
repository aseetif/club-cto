import { supabaseAdmin } from "@/lib/supabaseClient";
import { sendInvitationEmail } from "@/lib/emails";

type Status = "approved" | "rejected";

export async function handleInvitationDecision(
  invitationId: number,
  status: Status
) {
  const { data, error } = await supabaseAdmin
    .from("invitations")
    .update({ status })
    .eq("id", invitationId)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Update failed");
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
}
