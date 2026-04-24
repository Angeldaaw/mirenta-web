"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace("login");
    }

    return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="font-bold">Panel de Control</div>

      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">
            {user.name}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-3 py-1 text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );
}