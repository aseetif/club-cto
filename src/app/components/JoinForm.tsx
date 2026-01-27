"use client";

import { useState } from "react";

export default function JoinForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setStatus("loading");

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setStatus("success");
      setMessage(data.message);
      setEmail("");
    } else {
      setStatus("error");
      setMessage(data.message);
    }
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Votre email"
        className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white"
        required
      />

      <button
        className="w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Envoi..." : "Demander une invitation"}
      </button>

      {status === "success" && (
        <p className="text-sm text-green-400 mt-2">{message}</p>
      )}

      {status === "error" && (
        <p className="text-sm text-red-400 mt-2">{message}</p>
      )}
    </form>
  );
}
