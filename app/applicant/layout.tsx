"use client";
import AdminHeader from "@/components/admin/AdminHeader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-10">
      <AdminHeader title="Job List" />
      <main className="flex-1 flex items-start mt-[calc(64px+40px)] px-[104px] ">
        {children}
      </main>
    </div>
  );
}
