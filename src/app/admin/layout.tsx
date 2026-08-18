import Link from 'next/link';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tags, 
  Users, 
  ArrowLeft, 
  UserCheck 
} from 'lucide-react';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-8">
          
          {/* Logo Brand */}
          <div className="flex flex-col border-b border-slate-800 pb-5">
            <span className="text-sm font-extrabold tracking-widest text-slate-400">ADMIN CONTROL</span>
            <span className="text-base font-black text-white tracking-wide mt-1">INDIA JAN SEVA</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 flex flex-col text-left">
            <Link
              href="/admin/dashboard"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-sm font-semibold transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Overview Stats</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-sm font-semibold transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-slate-400" />
              <span>Order Management</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-sm font-semibold transition-all"
            >
              <Tags className="w-4 h-4 text-slate-400" />
              <span>Products Price config</span>
            </Link>

            <Link
              href="/admin/customers"
              className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white text-sm font-semibold transition-all"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Customer Base</span>
            </Link>
          </nav>
        </div>

        {/* Return to portal */}
        <div className="p-6 border-t border-slate-800 text-left">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Customer Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Page Area */}
      <main className="flex-grow p-10 overflow-y-auto bg-slate-900">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
