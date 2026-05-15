"use client";
import getGreeting from "@/app/utils/greeting";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bell, ThumbsUp } from "lucide-react";
import menuItems from "./constants/menuitems";
import { TenantsProvider } from "../context/TenantsContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <TenantsProvider>
      <div className="flex min-h-screen bg-[#060219] text-white">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black text-white rounded-lg"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

          <aside
            className={`
              lg:sticky lg:top-0 lg:translate-x-0
              fixed top-0 left-0 z-40
              bg-black text-white w-64 h-screen
              overflow-y-auto flex-shrink-0 self-start
              transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              transition-transform duration-300 ease-in-out
            `}
          >
          <div className="flex flex-col h-full p-4">
            <div className="mb-4 p-3">
              <h1 className="font-bold text-2xl mb-1">Admin Panel</h1>
            </div>

            <div className="flex-1  ">
              <h3 className="font-semibold text-blue-700 mb-3 p-3">MENU</h3>
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  let isActive = false;
                  if (item.href === "/admin") {
                    isActive = pathname === "/admin";
                  } else {
                    isActive =
                      pathname === item.href ||
                      pathname?.startsWith(`${item.href}/`);
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                      block p-3 rounded
                      transition-colors duration-200
                      ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-800 text-gray-300"
                      }
                    `}
                    >
                      {item.label}
                      {isActive && <span className="ml-2 text-xs">●</span>}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1  min-h-screen">
          <div className="sticky top-0 z-30 bg-[#060219] border-b border-gray-800 px-6 py-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{getGreeting()} Lord</h1>
                <p className="text-gray-400">Manage your apartment complex</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex-1 md:flex-initial">
                  <ThumbsUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    readOnly
                    placeholder="WE ARE SIKA..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 "
                  />
                </div>

                <Link
                  href="/admin/messages"
                  title="Messages"
                  className="cursor-pointer p-2 hover:bg-gray-800 rounded transition-colors"
                >
                  <Bell className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </TenantsProvider>
  );
}
