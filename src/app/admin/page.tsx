"use client";

import { useEffect, useState } from "react";

type Invitation = {
  id: number;
  email: string;
  status: string;
};

export default function AdminPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 modal delete
  const [deleteTarget, setDeleteTarget] = useState<Invitation | null>(null);

  const fetchInvitations = async () => {
    const res = await fetch("/api/admin/invitations");
    const json = await res.json();
    setInvitations(json.data || []);
  };

  useEffect(() => {
    fetchInvitations();
  }, []);

  const updateStatus = async (id: number, status: "approved" | "rejected") => {
    setLoading(true);
    await fetch(`/api/admin/invitations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await fetchInvitations();
    setLoading(false);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setLoading(true);
    await fetch(`/api/admin/invitations/${deleteTarget.id}`, {
      method: "DELETE",
    });

    setDeleteTarget(null);
    await fetchInvitations();
    setLoading(false);
  };

  const filteredInvitations = invitations.filter((invitation) =>
    invitation.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-5xl mx-auto bg-gray-900/60 border border-gray-800 rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6">Admin – Invitations</h1>

        {/* Recherche */}
        <input
          type="text"
          placeholder="Rechercher par email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Statut</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvitations.map((invitation) => (
                <tr key={invitation.id} className="border-t border-gray-800">
                  <td className="p-3 text-gray-200">
                    {invitation.email}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        invitation.status === "approved"
                          ? "bg-green-600/20 text-green-400"
                          : invitation.status === "rejected"
                          ? "bg-red-600/20 text-red-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}
                    >
                      {invitation.status}
                    </span>
                  </td>

                  <td className="p-3 flex gap-2">
                    <button
                      disabled={loading}
                      onClick={() => updateStatus(invitation.id, "approved")}
                      className="px-3 py-1 rounded-lg bg-green-600/20 text-green-400 hover:bg-green-600/30 transition"
                    >
                      Approve
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => updateStatus(invitation.id, "rejected")}
                      className="px-3 py-1 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition"
                    >
                      Reject
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => setDeleteTarget(invitation)}
                      className="px-3 py-1 rounded-lg bg-gray-700/40 text-gray-300 hover:bg-red-700/40 hover:text-red-400 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {filteredInvitations.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-gray-400">
                    Aucune invitation trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔥 MODAL DELETE */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              Supprimer l’invitation ?
            </h2>

            <p className="text-gray-300 mb-6">
              Tu es sur le point de supprimer l’invitation pour :
              <br />
              <span className="font-semibold text-white">
                {deleteTarget.email}
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 transition"
              >
                Annuler
              </button>

              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
