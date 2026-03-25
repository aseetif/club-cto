import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/isAdmin";
import AdminInvitationsClient from "./AdminInvitationsClient";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/dashboard");
  }

  return <AdminInvitationsClient />;
}