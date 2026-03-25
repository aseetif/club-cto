import { supabaseAdmin } from "@/lib/supabaseAdmin";
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";


  const loginLink =
    status === "approved"
      ? `${siteUrl}/login?token=${data.id}-${Date.now()}`
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
