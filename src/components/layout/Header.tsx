"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

    return (
      <header className="flex items-center justify-between border-b px-6 bg-[var(--card)] border-[var(--border)]  px-6 py-4 ">
        <div className="font-bold text-[var(--foreground)]"></div>

        <div className="flex items-center gap-4">
          {user && (
            <span className="text-sm text-[var(--muted-foreground)]">
              {user.name}
            </span>
          )}

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </header>
    );
}