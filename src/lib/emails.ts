import { resend } from "@/lib/resendClient";

type EmailStatus = "approved" | "rejected";

export async function sendInvitationEmail(
  email: string,
  name: string,
  status: EmailStatus,
  loginLink?: string,
  eventLink?: string
) {
  const subject =
    status === "approved"
      ? "Votre invitation au Club CTO est acceptée 🎉"
      : "Votre invitation au Club CTO";

  const htmlApproved = `
    <div style="font-family:sans-serif; color:#fff; background-color:#1E40AF; padding:20px; border-radius:10px;">
      <img src="https://clubcto.fr/logo.png" alt="Club CTO" style="width:120px; margin-bottom:20px;" />
      <h2>Bienvenue au Club CTO 🎉</h2>
      <p>Bonjour ${name},</p>
      <p>Votre demande a été acceptée.</p>

      ${
        loginLink
          ? `<p>Connectez-vous ici : <a href="${loginLink}" style="color:#FFD700;">Se connecter</a></p>`
          : ""
      }

      ${
        eventLink
          ? `<p>Réservez votre créneau pour notre prochain meetup : <a href="${eventLink}" style="color:#FFD700;">Calendly</a></p>`
          : ""
      }
    </div>
  `;

  const htmlRejected = `
    <div style="font-family:sans-serif; color:#fff; background-color:#1E40AF; padding:20px; border-radius:10px;">
      <img src="https://clubcto.fr/logo.png" alt="Club CTO" style="width:120px; margin-bottom:20px;" />
      <h2>Club CTO</h2>
      <p>Bonjour ${name},</p>
      <p>Merci pour votre intérêt.</p>
      <p>Votre demande n’a pas été retenue cette fois.</p>
    </div>
  `;

  return await resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: email,
    subject,
    html: status === "approved" ? htmlApproved : htmlRejected,
  });
}
