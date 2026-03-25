"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();

  const errorParam = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      if (error.message.toLowerCase().includes("rate limit")) {
        setMessage("Trop de tentatives. Réessaie dans quelques minutes.");
      } else {
        setMessage(`Erreur : ${error.message}`);
      }
    } else {
      setMessage("Lien magique envoyé. Vérifie ta boîte mail.");
    }

    setLoading(false);
  };

  

  return (
    <main className="app-shell flex items-center">
      <div className="app-container max-w-2xl">
        <section className="app-card p-8">
          <h1 className="app-title">Connexion</h1>

          {errorParam === "access_denied" && (
            <p className="mb-4 text-red-400">
              Accès refusé (invitation non approuvée)
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="app-input"
            />

            <button
              type="submit"
              disabled={loading}
              className="app-button app-button-success w-full disabled:opacity-50"
            >
              {loading ? "Envoi..." : "Se connecter"}
            </button>
          </form>

          {message && <p className="mt-4">{message}</p>}
        </section>
      </div>
    </main>
  );
}