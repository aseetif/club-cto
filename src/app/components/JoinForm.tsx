"use client";

import { useState } from "react";

export default function JoinForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | string>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setStatus(data.message);
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Votre email"
        className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
      />
      <button className="w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition">
        Demander une invitation
      </button>

      {status && <p className="text-sm text-gray-300 mt-2">{status}</p>}
    </form>
  );
}
