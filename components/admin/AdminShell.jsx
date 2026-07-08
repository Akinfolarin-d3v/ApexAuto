"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Car, PlusCircle, LogOut, ExternalLink } from "lucide-react";
import { clsx } from "@/lib/utils";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { signOutAdmin } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/cars", label: "Manage Cars", icon: Car },
  { href: "/admin/cars/new", label: "Add Car", icon: PlusCircle },
];

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAdminAuth();

  async function handleLogout() {
    await signOutAdmin();
    router.replace("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-steel-200 p-6 lg:flex">
        <Link href="/" className="font-display text-xl tracking-tightest">
          LoisnX <span className="text-signal-dim">Admin</span>
        </Link>

        <nav className="mt-10 flex flex-col gap-1">
          {NAV.map((item) => {
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
          {user?.email && <p className="mt-2 truncate px-3 font-mono text-[11px] text-steel-400">{user.email}</p>}
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
