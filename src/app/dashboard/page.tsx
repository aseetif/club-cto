import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  const { data: invitation } = await supabaseAdmin
    .from("invitations")
    .select("status, email, name")
    .eq("email", user.email)
    .single();

  if (!invitation || invitation.status !== "approved") {
    redirect("/login?error=access_denied");
  }

  const displayName =
    invitation?.name?.trim() || user.email.split("@")[0] || "Membre";

  return (
    <main className="app-shell">
      <div className="app-container">
        <section className="app-card p-8 md:p-10 mb-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-3">
                Espace privé
              </p>
              <h1 className="app-title mb-3">Bienvenue {displayName}</h1>
              <p className="app-subtitle max-w-2xl">
                Tu fais maintenant partie de Club CTO. Retrouve ici les accès,
                les prochains échanges et les ressources privées de la
                communauté.
              </p>
            </div>

            <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300">
              Invitation approuvée
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="app-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-3">
              Mon accès
            </p>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Compte membre
            </h2>

            <div className="space-y-3 text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm text-slate-400 mb-1">Email</p>
                <p className="text-white break-all">{user.email}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="text-sm text-slate-400 mb-1">Statut</p>
                <p className="text-emerald-300">Actif</p>
              </div>
            </div>
          </div>

          <div className="app-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-3">
              Prochain échange
            </p>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Réserver un créneau
            </h2>

            <p className="text-slate-300 leading-relaxed mb-5">
              Planifie un échange rapide pour rejoindre le rythme de la
              communauté, découvrir le format des rencontres et poser tes
              premières questions.
            </p>

            <a
              href="https://calendly.com/club-cto/meeting"
              target="_blank"
              rel="noreferrer"
              className="app-button app-button-success inline-flex items-center justify-center"
            >
              Ouvrir Calendly
            </a>
          </div>

          <div className="app-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-3">
              Communauté
            </p>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Accès privé
            </h2>

            <p className="text-slate-300 leading-relaxed mb-5">
              Retrouve les échanges, les ressources et les discussions entre
              CTOs dans l’espace privé de la communauté.
            </p>

            <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/40 p-4 text-sm text-slate-400">
              Ajoute ici ton lien Slack, Discord, Circle, Notion ou autre outil
              communautaire.
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="app-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-3">
              Ressources
            </p>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Documents privés
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Guide d’onboarding
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Présentation du fonctionnement de Club CTO, du rythme des
                  échanges et des bonnes pratiques dans la communauté.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Templates & frameworks
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Une base commune pour parler architecture, orga tech,
                  recrutement, delivery et arbitrages.
                </p>
              </div>
            </div>
          </div>

          <div className="app-card p-6">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400 mb-3">
              Activité
            </p>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Ce qui arrive bientôt
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-sm text-slate-400 mb-2">Session #1</p>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Architecture & décisions techniques
                </h3>
                <p className="text-slate-400 text-sm">
                  Format court entre CTOs pour partager des cas concrets et des
                  arbitrages réels.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <p className="text-sm text-slate-400 mb-2">Session #2</p>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Recrutement & organisation d’équipe
                </h3>
                <p className="text-slate-400 text-sm">
                  Discussions sur la structuration des équipes, les profils
                  seniors et les difficultés terrain.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}