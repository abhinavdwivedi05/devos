import React from "react";
import Sidebar from "@/components/navigation/Sidebar";
import Navbar from "@/components/navigation/Navbar";

export default function DashboardShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0d1117]">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Console Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden relative">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0d1117]">
          {children}
        </main>
      </div>
    </div>
  );
}
