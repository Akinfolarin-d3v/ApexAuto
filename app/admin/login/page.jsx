"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { signInAdmin } from "@/lib/auth";
import Button from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInAdmin({ email, password });
      router.push("/admin");
    } catch (err) {
      setError(err.message || "Couldn't sign in. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-steel-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-steel-200 bg-canvas p-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-signal">
          <LockKeyhole size={20} strokeWidth={1.75} />
        </div>
        <h1 className="mt-5 font-display text-2xl tracking-tightest">Admin sign in</h1>
        <p className="mt-1 text-sm text-steel-500">Sign in to manage inventory, listings, and orders.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-steel-500">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@loisnx.com"
              className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="text-steel-500">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-steel-200 px-3 py-2.5 focus:border-ink focus:outline-none"
            />
          </label>

          {error && <p className="text-sm text-velocity">{error}</p>}

          <Button type="submit" disabled={loading} className="mt-2 disabled:opacity-50">
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <Link href="/" className="mt-6 block text-center text-sm text-steel-500 hover:text-ink">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
