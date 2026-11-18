'use client';

import React from "react";
import { AppTopNav } from "@/components/top-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-50/50 font-sans">
      <AppTopNav />
      <main className="flex-1 w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6 overflow-y-auto">
        <div className="w-full max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
