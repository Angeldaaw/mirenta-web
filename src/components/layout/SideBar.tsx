"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
    const pathName = usePathname();

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Propiedades", href: "/properties" },
    ];

    return (
        <aside className="w-64 bg.white border-r border-gray-200 p-6">
            <div className="text-xl font-semibold mb-8">MiRenta</div>

            <nav className="space-y-2">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={clsx(
                            "block px-4 py-2 rounded-lg text-sm font-medium transition",
                            pathName === item.href
                                ? "bg-primary text-black"
                                : "text-gray-400 hover:bg-gray-100"
                        )}>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}