import { supabase } from "@/lib/supabase";

export async function createInvitation(email: string) {
  return supabase.from("invitations").insert({
    email,
    status: "pending",
  });
}