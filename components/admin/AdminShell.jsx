"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Car, PlusCircle, Users, LogOut, ExternalLink } from "lucide-react";
import { clsx } from "@/lib/utils";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { signOutAdmin } from "@/lib/auth";
import { isFirebaseConfigured } from "@/lib/firebase";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/cars", label: "Manage Cars", icon: Car },
  { href: "/admin/cars/new", label: "Add Car", icon: PlusCircle },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isPrimary } = useAdminAuth();

  async function handleLogout() {
    await signOutAdmin();
    router.replace("/admin/login");
  }

  const nav = isFirebaseConfigured && isPrimary
    ? [...NAV, { href: "/admin/team", label: "Team", icon: Users }]
    : NAV;

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-steel-200 p-6 lg:flex">
        <Link href="/" className="font-display text-xl tracking-tightest">
          LoisnX <span className="text-signal-dim">Admin</span>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {nav.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-ink text-canvas" : "text-steel-600 hover:bg-steel-100"
                )}
              >
                <Icon size={16} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-steel-200 pt-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-steel-600 hover:bg-steel-100"
          >
            <ExternalLink size={16} strokeWidth={1.75} />
            View Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-velocity hover:bg-velocity-tint"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Log Out
          </button>
          {user?.email && (
            <div className="mt-2 px-3">
              <p className="truncate text-[11px] text-steel-400">{user.email}</p>
              {isFirebaseConfigured && (
                <span className={clsx(
                  "mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                  isPrimary ? "bg-signal-tint text-signal-dim" : "bg-trust-tint text-trust-dim"
                )}>
                  {isPrimary ? "Primary admin" : "Invited admin"}
                </span>
              )}
            </div>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
