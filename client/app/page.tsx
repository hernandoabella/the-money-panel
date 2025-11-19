"use client";

import { Sidebar } from "../app/components/Sidebar";
import { Topbar } from "../app/components/Topbar";
import { DashboardCards } from "../app/components/dashboard/DashboardCards";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <Topbar />

        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <DashboardCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Crypto Overview</h2>
            <p>Charts, API data, coin prices, etc…</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Finance APIs</h2>
            <p>Banks, currencies, stocks API here…</p>
          </div>
        </div>
      </main>
    </div>
  );
}
