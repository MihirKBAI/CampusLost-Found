import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

function AdminUploaderModal({ isOpen, onClose }) {
  const { fetchAdminUsers, toggleUploaderApproval } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    (async () => {
      try {
        const list = await fetchAdminUsers();
        if (!cancelled) setUsers(list);
      } catch (err) {
        if (!cancelled) {
          setError(
            (err && err.message) || "Could not load user list for approval."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, fetchAdminUsers]);

  if (!isOpen) return null;

  async function handleToggle(user) {
    setUpdatingId(user.id);
    setError(null);
    try {
      const nextApproved = !user.isApprovedUploader;
      await toggleUploaderApproval(user.id, nextApproved);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, isApprovedUploader: nextApproved } : u
        )
      );
    } catch (err) {
      setError(
        (err && err.message) ||
          "Could not update uploader authorization. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl rounded-card border border-line bg-surface p-6 shadow-xl sm:p-8">
        <div className="flex items-start justify-between border-b border-line pb-4">
          <div>
            <h2 id="modal-title" className="type-section text-xl font-bold text-ink">
              Manage Approved Uploaders
            </h2>
            <p className="mt-1 text-xs text-mute sm:text-sm">
              Users approved by campus admins are granted clearance to upload verified
              items and view revealed, authentic photos in the Lost & Found registries.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-control p-1 text-mute hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            aria-label="Close dialog"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-control border border-lost/30 bg-lost-tint p-3 text-xs text-lost">
            {error}
          </div>
        )}

        <div className="mt-4 max-h-96 overflow-y-auto divide-y divide-line">
          {loading ? (
            <div className="py-8 text-center text-sm font-medium text-mute">
              Loading campus accounts…
            </div>
          ) : users.length === 0 ? (
            <div className="py-8 text-center text-sm text-mute">
              No registered student accounts found.
            </div>
          ) : (
            users.map((u) => {
              const isApproved = Boolean(u.isAdmin || u.isApprovedUploader);
              const isUpdating = updatingId === u.id;

              return (
                <div
                  key={u.id}
                  className="flex flex-col gap-3 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-ink break-words">
                        {u.name}
                      </p>
                      {u.isAdmin ? (
                        <span className="rounded-full bg-lost/10 px-2 py-0.5 text-[10px] font-bold uppercase text-lost">
                          Admin
                        </span>
                      ) : isApproved ? (
                        <span className="rounded-full bg-canopy/10 px-2 py-0.5 text-[10px] font-bold uppercase text-canopy">
                          Approved Uploader
                        </span>
                      ) : (
                        <span className="rounded-full bg-mute/10 px-2 py-0.5 text-[10px] font-medium uppercase text-mute">
                          Standard
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-mute mt-0.5">
                      {u.email} {u.prn ? `· PRN: ${u.prn}` : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {u.isAdmin ? (
                      <span className="text-xs font-medium text-mute/80 italic">
                        Full admin access
                      </span>
                    ) : (
                      <Button
                        type="button"
                        variant={isApproved ? "secondary" : "primary"}
                        size="sm"
                        disabled={isUpdating}
                        onClick={() => handleToggle(u)}
                      >
                        {isUpdating
                          ? "Updating…"
                          : isApproved
                          ? "Revoke Approval"
                          : "Approve Uploader"}
                      </Button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 flex justify-end border-t border-line pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdminUploaderModal;
