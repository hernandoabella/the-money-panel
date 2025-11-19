import { FaChartPie, FaBitcoin, FaWallet, FaCog } from "react-icons/fa";
import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white shadow-lg p-6 flex flex-col">
      <h1 className="text-2xl font-bold mb-10">Money Panel</h1>

      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <FaChartPie /> Dashboard
        </Link>

        <Link href="/crypto" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <FaBitcoin /> Crypto
        </Link>

        <Link href="/finances" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <FaWallet /> Finances
        </Link>

        <Link href="/settings" className="flex items-center gap-3 text-gray-700 hover:text-black">
          <FaCog /> Settings
        </Link>
      </nav>
    </aside>
  );
}
