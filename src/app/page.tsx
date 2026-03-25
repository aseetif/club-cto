import React from "react";
import JoinForm from "./components/JoinForm";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-4xl font-bold mb-4">Club CTO</h1>
        <p className="text-gray-300 mb-6">
          Un espace d’échange privé pour CTOs autour de la tech, de l’architecture et du recrutement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-800 rounded-xl">
            <h3 className="font-semibold">Échanges concrets</h3>
            <p className="text-gray-400 text-sm">Retours d’expérience, best practices, décisions d’architecture.</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl">
            <h3 className="font-semibold">Format court</h3>
            <p className="text-gray-400 text-sm">Meetups de 30 min, sans perte de temps.</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl">
            <h3 className="font-semibold">Communauté sélectionnée</h3>
            <p className="text-gray-400 text-sm">Invitation uniquement pour CTOs / leaders techniques.</p>
          </div>
        </div>
        <JoinForm />
      </div>
    </main>
  );
}
