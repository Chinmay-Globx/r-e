import { Bell } from 'lucide-react';
import { useStore } from '../../store';
import { Badge } from '../ui/badge';

const Header = () => {
  const { notifications, currentUser } = useStore();
  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b-2 border-gray-200 shadow-soft">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Welcome back, {currentUser?.name}</h2>
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative p-2 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-rose-500 animate-pulse-ring"
              >
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
