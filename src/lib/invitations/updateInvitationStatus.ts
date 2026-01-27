import { supabase } from "@/lib/supabaseClient";

export async function updateInvitationStatus(
  id: string,
  status: "approved" | "rejected"
) {
  return supabase
    .from("invitations")
    .update({ status })
    .eq("id", id);
}
