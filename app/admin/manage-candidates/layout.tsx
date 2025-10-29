"use client";
import AdminHeader from "@/components/admin/AdminHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-neutral-10">
      <AdminHeader
        breadcrumb={[
          { label: "Job list", href: "/admin/jobs" },
          { label: "Manage Candidate", active: true },
        ]}
      />
      <main className="flex-1 mt-16 py-6 px-6">{children}</main>
    </div>
  );
}
