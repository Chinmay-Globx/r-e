import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Truck, 
  CheckCircle, 
  Users, 
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useStore } from '../../store';
import { cn } from '../../lib/utils';
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const { currentUser, logout } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    const role = currentUser?.role;
    
    const allItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['admin', 'backup_office', 'godown_incharge', 'dispatcher', 'delivery_man'] },
      { icon: Package, label: 'Orders', path: '/orders', roles: ['admin', 'backup_office'] },
      { icon: Package, label: 'Stock & DO', path: '/godown', roles: ['admin', 'godown_incharge'] },
      { icon: Truck, label: 'Dispatch', path: '/dispatch', roles: ['admin', 'dispatcher'] },
      { icon: CheckCircle, label: 'Delivery', path: '/delivery', roles: ['admin', 'delivery_man'] },
      { icon: Users, label: 'Users', path: '/users', roles: ['admin'] },
      { icon: Bell, label: 'Notifications', path: '/notifications', roles: ['admin', 'backup_office', 'godown_incharge', 'dispatcher', 'delivery_man'] },
    ];

    return allItems.filter(item => item.roles.includes(role || ''));
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-card border border-border"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen bg-white border-r-2 border-gray-200 flex flex-col transition-transform duration-300 z-40 shadow-medium",
          "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h1 className="text-xl font-bold text-gray-900">RASMI ERP</h1>
          <p className="text-xs text-gray-700 mt-1 font-medium">{currentUser?.name}</p>
          <p className="text-xs text-gray-600 capitalize">{currentUser?.role?.replace('_', ' ')}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-soft"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-700 w-full transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
