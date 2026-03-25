"use client";

import { useEffect, useState } from "react";

type Invitation = {
  id: number;
  email: string;
  status: string;
};

export default function AdminInvitationsClient() {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
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
    <main className="app-shell">
      <div className="app-container">
        <section className="app-card p-8 md:p-10">
          <h1 className="app-title">Admin – Invitations</h1>

          <div className="mb-8">
            <input
              type="text"
              placeholder="Rechercher par email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="app-input"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="app-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredInvitations.map((invitation) => (
                  <tr key={invitation.id}>
                    <td>{invitation.email}</td>

                    <td>
                      {invitation.status === "approved" && (
                        <span className="app-badge app-badge-success">
                          approved
                        </span>
                      )}

                      {invitation.status === "rejected" && (
                        <span className="app-badge app-badge-danger">
                          rejected
                        </span>
                      )}

                      {invitation.status !== "approved" &&
                        invitation.status !== "rejected" && (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-yellow-500/20 text-yellow-300">
                            {invitation.status}
                          </span>
                        )}
                    </td>

                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          disabled={loading}
                          onClick={() => updateStatus(invitation.id, "approved")}
                          className="app-button app-button-success disabled:opacity-50"
                        >
                          Approve
                        </button>

                        <button
                          disabled={loading}
                          onClick={() => updateStatus(invitation.id, "rejected")}
                          className="app-button app-button-danger disabled:opacity-50"
                        >
                          Reject
                        </button>

                        <button
                          disabled={loading}
                          onClick={() => setDeleteTarget(invitation)}
                          className="app-button app-button-neutral disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInvitations.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-slate-400 py-8">
                      Aucune invitation trouvée
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4">
          <div className="app-card w-full max-w-md p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Supprimer l’invitation ?
            </h2>

            <p className="text-slate-300 mb-6 leading-relaxed">
              Tu es sur le point de supprimer l’invitation pour :
              <br />
              <span className="font-semibold text-white">
                {deleteTarget.email}
              </span>
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="app-button app-button-neutral"
              >
                Annuler
              </button>

              <button
                onClick={confirmDelete}
                disabled={loading}
                className="app-button app-button-danger disabled:opacity-50"
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