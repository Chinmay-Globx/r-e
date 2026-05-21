import { Bell } from 'lucide-react';
import { useStore } from '../../store';
import { Badge } from '../ui/badge';

const Header = () => {
  const { notifications, currentUser } = useStore();
  const unreadCount = notifications.filter(n => !n.read && n.userId === currentUser?.id).length;

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold">Welcome back, {currentUser?.name}</h2>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell size={20} className="text-muted-foreground" />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
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
