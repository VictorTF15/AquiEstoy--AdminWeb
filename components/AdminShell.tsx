"use client";

import AuthGuard from "@/components/AuthGuard";
import { AdminSidebar } from "@/components/AdminSidebar";
import { PageTransition } from "@/components/PageTransition";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 md:flex">
        <AdminSidebar />
        <main className="flex-1 px-4 py-5 md:px-8 md:py-8">
          <PageTransition>
            <div className="panel-blue-card px-4 py-4 md:px-6 md:py-6">
              {children}
            </div>
          </PageTransition>
        </main>
      </div>
    </AuthGuard>
  );
}
