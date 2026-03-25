import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function listInvitations() {
  return supabaseAdmin
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });
}