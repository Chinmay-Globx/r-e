import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useStore } from '../store';
import { Bell, Check } from 'lucide-react';
import { format } from 'date-fns';

const Notifications = () => {
  const { notifications, currentUser, markNotificationRead } = useStore();

  const userNotifications = notifications.filter(n => n.userId === currentUser?.id);
  const unreadNotifications = userNotifications.filter(n => !n.read);

  const handleMarkAsRead = (id: string) => {
    markNotificationRead(id);
  };

  const handleMarkAllAsRead = () => {
    unreadNotifications.forEach(n => markNotificationRead(n.id));
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Stay updated with order status changes</p>
        </div>
        {unreadNotifications.length > 0 && (
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userNotifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadNotifications.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userNotifications.filter(n => n.read).length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userNotifications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No notifications</p>
            ) : (
              userNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border rounded-lg p-4 transition-colors ${
                    notification.read ? 'border-border bg-background' : 'border-primary/50 bg-accent/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{notification.title}</h3>
                        {!notification.read && (
                          <span className="h-2 w-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(notification.createdAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    {!notification.read && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
