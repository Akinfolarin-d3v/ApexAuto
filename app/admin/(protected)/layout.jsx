import AdminGuard from "@/components/admin/AdminGuard";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin — LoisnX",
  robots: { index: false, follow: false },
};

export default function AdminProtectedLayout({ children }) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
