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

    if (!token) {
        return null; // middleware ya redirige
    }

    return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}