import { supabase } from "@/lib/supabaseClient";

export async function createInvitation(email: string) {
  return supabase.from("invitations").insert({
    email,
    status: "pending",
  });
}