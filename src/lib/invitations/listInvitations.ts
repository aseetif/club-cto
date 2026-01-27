import { supabase } from "@/lib/supabaseClient";

export async function listInvitations() {
  return supabase
    .from("invitations")
    .select("*")
    .order("created_at", { ascending: false });
}