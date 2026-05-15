"use client";
import getGreeting from "@/app/utils/greeting";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell } from "lucide-react";
import MenuPaths from "./constants/MenuPaths";
import { useTenant } from "../hooks/useTenant";

export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { tenant, loading } = useTenant();

  return (
    <div className="flex min-h-screen bg-[#060219] text-white">
     
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

       
      <aside
        className={`
        lg:static lg:translate-x-0
        fixed top-0 left-0 z-40 bg-black text-white w-64
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out
      `}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-4 p-3">
            <h1 className="font-bold text-2xl mb-1">Tenant Portal</h1>
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-blue-700 mb-3 p-3">MENU</h3>
            <nav className="space-y-1">
              <nav className="space-y-1">
                {MenuPaths.map((item) => {
                  
                  let isActive = false;
 
                  if (item.href === "/tenant") {
                     
                    isActive = pathname === "/tenant";
                  } else {
                     isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
          block p-3 rounded-lg transition-all duration-200 group
          ${
            isActive
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg font-semibold"
              : "text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md"
          }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="ml-2 inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </nav>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <div className="sticky top-0 z-30 bg-[#060219] border-b border-gray-800 px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">
                {getGreeting()}{" "}
                {loading
                  ? "Loading..."
                  : tenant?.name?.split(" ")[0] || "Tenant"}
              </h1>
              <p className="text-gray-400">
                {loading
                  ? "Loading profile..."
                  : tenant
                    ? "Have a nice stay here"
                    : "Please login"}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/tenant/updates"
                title="updates"
                className="p-2 hover:bg-gray-800 rounded transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
