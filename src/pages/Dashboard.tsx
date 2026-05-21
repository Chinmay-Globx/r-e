import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useStore } from '../store';
import { Package, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { format } from 'date-fns';

const Dashboard = () => {
  const { orders, activityLogs } = useStore();

  const stats = {
    total: orders.length,
    new: orders.filter(o => o.status === 'new').length,
    inProgress: orders.filter(o => ['do_raised', 'roll_ready', 'dispatched'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    notAvailable: orders.filter(o => o.status === 'not_available').length,
  };

  const recentOrders = orders.slice(0, 5);
  const recentActivity = activityLogs.slice(0, 8);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of order management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Active orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.delivered}</div>
            <p className="text-xs text-muted-foreground">Completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Available</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notAvailable}</div>
            <p className="text-xs text-muted-foreground">Out of stock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">No activity yet</p>
              ) : (
                recentActivity.map((log) => (
                  <div key={log.id} className="flex gap-3 text-sm">
                    <div className="flex-shrink-0 w-2 h-2 mt-1.5 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.userName} • {format(new Date(log.timestamp), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
