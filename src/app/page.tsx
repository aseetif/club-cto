import React from "react";
import JoinForm from "./components/JoinForm";

export default function Home() {
  return (
    <main className="app-shell flex items-center">
      <div className="app-container max-w-5xl">
        <section className="app-card p-8 md:p-10">
          <h1 className="app-title">Club CTO</h1>

          <p className="app-subtitle mb-8 max-w-3xl">
            Un espace d’échange privé pour CTOs autour de la tech, de
            l’architecture et du recrutement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Échanges concrets
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Retours d’expérience, best practices et décisions
                d’architecture.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Format court
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Meetups de 30 minutes, utiles et sans perte de temps.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                Communauté sélectionnée
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Invitation uniquement pour CTOs et leaders techniques.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-6">
            <JoinForm />
          </div>
        </section>
      </div>
    </main>
  );
}