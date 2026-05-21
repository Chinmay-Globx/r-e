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
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: ['admin', 'backup_office'] },
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
          "fixed lg:sticky top-0 left-0 h-screen bg-card border-r border-border flex flex-col transition-transform duration-300 z-40",
          "w-64",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold">RASMI ERP</h1>
          <p className="text-xs text-muted-foreground mt-1">{currentUser?.name}</p>
          <p className="text-xs text-muted-foreground capitalize">{currentUser?.role?.replace('_', ' ')}</p>
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
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full transition-colors"
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
