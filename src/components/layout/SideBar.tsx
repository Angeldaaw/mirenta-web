"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Propiedades", href: "/properties" },
    ];

export default function Sidebar() {
    const pathName = usePathname();

    return (
        <aside className="min-h-screen w-64 border-r border-[var(--border)] bg-[var(--sidebar)] p-6 text-[var(--sidebar-foreground)]">
            <div className="mb-8 text-xl font-semibold text-white">
                MiRenta
            </div>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            "block rounded-lg px-4 py-2 text-sm font-medium transition",
                            pathName === item.href
                                ? "bg-[var(--sidebar-active)] text-white"
                                : "text-[var(--sidebar-foreground)] hover:bg-white/10 hover:text-white"
                        )}
                        >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}