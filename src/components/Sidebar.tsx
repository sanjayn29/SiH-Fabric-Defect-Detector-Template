import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Video, Palette, ImageIcon, FileText, Settings } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/live-inspection', icon: Video, label: 'Live Inspection' },
  { path: '/color-clustering', icon: Palette, label: 'Color Clustering' },
  { path: '/defect-gallery', icon: ImageIcon, label: 'Defect Gallery' },
  { path: '/roll-reports', icon: FileText, label: 'Roll Reports' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">FabSpector</h1>
        <p className="text-xs text-gray-400 mt-1">Fabric Inspection System</p>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
