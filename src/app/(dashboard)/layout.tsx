"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {

    const {loading, token } = useAuth();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
    <div className="flex min-h-screen bg-[var(--background)]">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6">
            {children}
        </main>
      </div>
    </div>
  );
}