import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 bg-surface overflow-y-auto">{children}</main>
    </div>
  );
}
