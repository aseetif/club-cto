export function isAdminEmail(email: string) {
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.toLowerCase());
}