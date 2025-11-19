"use client";

import { FaChartLine, FaCoins, FaDollarSign } from "react-icons/fa";

export function DashboardCards() {
  const cards = [
    { title: "Portfolio Value", value: "$12,530", icon: <FaDollarSign /> },
    { title: "Crypto Held", value: "5.23 BTC", icon: <FaCoins /> },
    { title: "Monthly Profit", value: "+12.4%", icon: <FaChartLine /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <div className="text-3xl text-blue-500">{card.icon}</div>
          <div>
            <p className="text-gray-500">{card.title}</p>
            <p className="text-xl font-bold">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
