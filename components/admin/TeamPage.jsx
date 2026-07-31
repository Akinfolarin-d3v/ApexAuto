"use client";

import { useEffect, useState } from "react";
import { Users, Trash2, ShieldCheck, Clock } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { isFirebaseConfigured } from "@/lib/firebase";
import { inviteAdmin, revokeAdmin, listInvitedAdmins } from "@/lib/auth";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

export default function TeamPage() {
  const { user, isPrimary, loading: authLoading } = useAdminAuth();
  const [invites, setInvites] = useState(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [pendingRevoke, setPendingRevoke] = useState(null);

  const allowed = isFirebaseConfigured && isPrimary;

  useEffect(() => {
    if (!allowed) return;
    listInvitedAdmins().then(setInvites);
  }, [allowed]);

  async function handleInvite(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await inviteAdmin(email, user?.email);
      setEmail("");
      setInvites(await listInvitedAdmins());
    } catch (err) {
      setError("Couldn't add that admin. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRevoke() {
    if (!pendingRevoke) return;
    const target = pendingRevoke;
    setPendingRevoke(null);
    await revokeAdmin(target.email, target.claimedUid);
    setInvites((prev) => prev?.filter((i) => i.email !== target.email));
  }

  if (authLoading || (allowed && invites === null)) {
    return <p className="p-10 font-mono text-sm text-steel-500">Loading…</p>;
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="p-6 sm:p-10">
        <h1 className="font-display text-3xl tracking-tightest">Team</h1>
        <p className="mt-4 max-w-md text-sm text-steel-500">
          Admin invites need real Firestore configured — this only works
          once you've added your Firebase keys to <code>.env.local</code>.
        </p>
      </div>
    );
  }

  if (!isPrimary) {
    return (
      <div className="p-6 sm:p-10">
        <h1 className="font-display text-3xl tracking-tightest">Team</h1>
        <p className="mt-4 max-w-md text-sm text-steel-500">
          Only the primary admin can manage who has access. If you need
          another admin added, ask whoever set up this account.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel-500">Access</p>
      <h1 className="mt-2 font-display text-3xl tracking-tightest md:text-4xl">Team</h1>
      <p className="mt-3 max-w-lg text-sm text-steel-500">
        Add an admin by email — no password setup needed on your end, they
        pick any password when they first sign in. They can manage
        inventory but can't invite anyone else.
      </p>

      <form onSubmit={handleInvite} className="mt-8 flex max-w-md gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="teammate@example.com"
          className="flex-1 rounded-full border border-steel-200 px-4 py-2.5 text-sm focus:border-ink focus:outline-none"
        />
        <Button type="submit" disabled={submitting} className="disabled:opacity-50">
          {submitting ? "Adding…" : "Add Admin"}
        </Button>
      </form>
      {error && <p className="mt-2 text-sm text-velocity">{error}</p>}

      <div className="mt-10 max-w-2xl overflow-hidden rounded-2xl border border-steel-200">
        {invites.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-10 text-center">
            <Users size={24} strokeWidth={1.5} className="text-steel-300" />
            <p className="text-sm text-steel-500">No invited admins yet.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-steel-200">
            {invites.map((invite) => (
              <div key={invite.email} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-ink">{invite.email}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-steel-400">
                    {invite.claimedUid ? (
                      <>
                        <ShieldCheck size={12} strokeWidth={2} className="text-trust" />
                        Active
                      </>
                    ) : (
                      <>
                        <Clock size={12} strokeWidth={2} />
                        Not signed in yet
                      </>
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingRevoke(invite)}
                  aria-label={`Remove ${invite.email}`}
                  className="rounded-lg border border-steel-200 p-2 text-steel-600 hover:border-velocity hover:text-velocity"
                >
                  <Trash2 size={15} strokeWidth={1.75} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingRevoke)}
        title={`Remove ${pendingRevoke?.email}?`}
        description="They'll lose admin access immediately."
        confirmLabel="Remove"
        danger
        onCancel={() => setPendingRevoke(null)}
        onConfirm={handleRevoke}
      />
    </div>
  );
}
