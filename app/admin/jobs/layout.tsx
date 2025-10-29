"use client";
import AdminHeader from "@/components/admin/AdminHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative w-full min-h-screen flex flex-col bg-neutral-10">
      <AdminHeader title="Job List" />
      <main className="flex-1 mt-16 px-6 py-4">{children}</main>
    </div>
  );
}
