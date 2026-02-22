import { ReactNode } from "react";
import Sidebar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-8">{children}</main>
            </div>
        </div>
    );
}