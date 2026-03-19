import Link from "next/link";
import { Leaf, LayoutDashboard, Settings, LogOut, FileText } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-gray-950 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Leaf className="h-6 w-6 text-emerald-500 mr-2" />
          <span className="font-bold text-lg text-white">GreenTrack AI</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/dashboard" className="flex items-center px-4 py-3 text-emerald-400 bg-emerald-500/10 rounded-xl font-medium transition-colors">
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition-colors">
            <FileText className="h-5 w-5 mr-3" />
            Reports
          </Link>
          <Link href="#" className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition-colors">
            <Settings className="h-5 w-5 mr-3" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-xl transition-colors cursor-pointer">
            <LogOut className="h-5 w-5 mr-3" />
            Sign Out
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black">
        <div className="max-w-7xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
