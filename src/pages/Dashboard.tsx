import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { useStore } from '../store';
import { Package, CheckCircle, AlertCircle, TrendingUp, Users, Clock, Truck, Box, Plus, FileText, UserPlus } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { format } from 'date-fns';
import { ClickableMetricCard } from '../components/dashboard/ClickableMetricCard';
import { QuickActionBar } from '../components/dashboard/QuickActionBar';
import { QuickOrderModal } from '../components/modals/QuickOrderModal';

const Dashboard = () => {
  const { orders, activityLogs, currentUser, users } = useStore();

  if (!currentUser) return null;

  switch (currentUser.role) {
    case 'admin':
      return <AdminDashboard orders={orders} activityLogs={activityLogs} users={users} />;
    case 'backup_office':
      return <BackupOfficeDashboard orders={orders} currentUser={currentUser} />;
    case 'godown_incharge':
      return <GodownDashboard orders={orders} currentUser={currentUser} />;
    case 'dispatcher':
      return <DispatcherDashboard orders={orders} currentUser={currentUser} />;
    case 'delivery_man':
      return <DeliveryManDashboard orders={orders} currentUser={currentUser} />;
    default:
      return <div className="text-center py-12 text-muted-foreground">Dashboard not available for your role</div>;
  }
};

const AdminDashboard = ({ orders, activityLogs, users }: any) => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const today = new Date().toDateString();
  
  const stats = {
    totalOrders: orders.length,
    newOrders: orders.filter((o: any) => o.status === 'new').length,
    inProgress: orders.filter((o: any) => ['do_raised', 'roll_ready', 'dispatched'].includes(o.status)).length,
    delivered: orders.filter((o: any) => o.status === 'delivered').length,
    notAvailable: orders.filter((o: any) => o.status === 'not_available').length,
    todayOrders: orders.filter((o: any) => new Date(o.createdAt).toDateString() === today).length,
    todayDelivered: orders.filter((o: any) => o.deliveredAt && new Date(o.deliveredAt).toDateString() === today).length,
    activeUsers: users.length,
  };

  const recentOrders = orders.slice(0, 6);
  const recentActivity = activityLogs.slice(0, 10);

  const quickActions = [
    {
      label: 'Create Order',
      icon: <Plus className="h-4 w-4" />,
      onClick: () => setShowOrderModal(true),
    },
    {
      label: 'View Reports',
      icon: <FileText className="h-4 w-4" />,
      onClick: () => alert('Reports feature coming soon!'),
      variant: 'outline' as const,
    },
    {
      label: 'Manage Users',
      icon: <UserPlus className="h-4 w-4" />,
      onClick: () => window.location.href = '/users',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Complete system overview and analytics</p>
        </div>
        <QuickActionBar actions={quickActions} />
      </div>

      <QuickOrderModal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ClickableMetricCard
          title="Total Orders"
          value={stats.totalOrders}
          description="All time"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          href="/orders"
        />

        <ClickableMetricCard
          title="New Orders"
          value={stats.newOrders}
          description="Awaiting processing"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
          href="/orders?status=new"
          variant="warning"
        />

        <ClickableMetricCard
          title="In Progress"
          value={stats.inProgress}
          description="Active pipeline"
          icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          href="/orders?status=do_raised,roll_ready,dispatched"
        />

        <ClickableMetricCard
          title="Delivered"
          value={stats.delivered}
          description="Completed"
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          href="/orders?status=delivered"
          variant="success"
        />

        <ClickableMetricCard
          title="Today's Orders"
          value={stats.todayOrders}
          description="Created today"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          href="/orders?date=today"
        />

        <ClickableMetricCard
          title="Today's Deliveries"
          value={stats.todayDelivered}
          description="Delivered today"
          icon={<Truck className="h-4 w-4 text-muted-foreground" />}
          href="/orders?status=delivered&date=today"
          variant="success"
        />

        <ClickableMetricCard
          title="Not Available"
          value={stats.notAvailable}
          description="Out of stock"
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
          href="/orders?status=not_available"
          variant="danger"
        />

        <ClickableMetricCard
          title="Active Users"
          value={stats.activeUsers}
          description="System users"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          href="/users"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No orders yet</p>
              ) : (
                recentOrders.map((order: any) => (
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
            <CardTitle>System Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No activity yet</p>
              ) : (
                recentActivity.map((log: any) => (
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

const BackupOfficeDashboard = ({ orders, currentUser }: any) => {
  const [showOrderModal, setShowOrderModal] = useState(false);
  const today = new Date().toDateString();
  
  const myOrders = orders.filter((o: any) => o.createdBy === currentUser.id);
  const todayOrders = myOrders.filter((o: any) => new Date(o.createdAt).toDateString() === today);
  
  const stats = {
    myTotal: myOrders.length,
    todayCreated: todayOrders.length,
    pending: myOrders.filter((o: any) => o.status === 'new').length,
    inTransit: myOrders.filter((o: any) => ['do_raised', 'roll_ready', 'dispatched'].includes(o.status)).length,
    delivered: myOrders.filter((o: any) => o.status === 'delivered').length,
    notAvailable: myOrders.filter((o: any) => o.status === 'not_available').length,
  };

  const recentOrders = myOrders.slice(0, 8);
  const needsAttention = myOrders.filter((o: any) => o.status === 'not_available');

  const quickActions = [
    {
      label: 'Create Order',
      icon: <Plus className="h-4 w-4" />,
      onClick: () => setShowOrderModal(true),
    },
    {
      label: 'View All Orders',
      icon: <Package className="h-4 w-4" />,
      onClick: () => window.location.href = '/orders?createdBy=me',
      variant: 'outline' as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Backup Office Dashboard</h1>
          <p className="text-muted-foreground">Your order tracking and management overview</p>
        </div>
        <QuickActionBar actions={quickActions} />
      </div>

      <QuickOrderModal isOpen={showOrderModal} onClose={() => setShowOrderModal(false)} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ClickableMetricCard
          title="My Total Orders"
          value={stats.myTotal}
          description="Orders created by you"
          icon={<Package className="h-4 w-4 text-muted-foreground" />}
          href="/orders?createdBy=me"
        />

        <ClickableMetricCard
          title="Today's Orders"
          value={stats.todayCreated}
          description="Created today"
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          href="/orders?createdBy=me&date=today"
        />

        <ClickableMetricCard
          title="Pending"
          value={stats.pending}
          description="Awaiting processing"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
          href="/orders?createdBy=me&status=new"
          variant="warning"
        />

        <ClickableMetricCard
          title="In Transit"
          value={stats.inTransit}
          description="Being processed"
          icon={<Truck className="h-4 w-4 text-muted-foreground" />}
          href="/orders?createdBy=me&status=do_raised,roll_ready,dispatched"
        />

        <ClickableMetricCard
          title="Delivered"
          value={stats.delivered}
          description="Successfully completed"
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          href="/orders?createdBy=me&status=delivered"
          variant="success"
        />

        <ClickableMetricCard
          title="Needs Attention"
          value={stats.notAvailable}
          description="Items not available"
          icon={<AlertCircle className="h-4 w-4 text-destructive" />}
          href="/orders?createdBy=me&status=not_available"
          variant="danger"
          className={stats.notAvailable > 0 ? 'border-destructive' : ''}
        />
      </div>

      {needsAttention.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Orders Requiring Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {needsAttention.map((order: any) => (
                <div
                  key={order.id}
                  className="p-3 border border-destructive/50 rounded-lg bg-destructive/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <div className="bg-background p-2 rounded text-sm">
                    <p className="font-medium text-destructive">Reason:</p>
                    <p className="text-muted-foreground">{order.unavailableReason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>My Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">No orders created yet</p>
            ) : (
              recentOrders.map((order: any) => (
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
    </div>
  );
};

const GodownDashboard = ({ orders }: any) => {
  const today = new Date().toDateString();
  
  const stats = {
    pendingDO: orders.filter((o: any) => o.status === 'new').length,
    doRaised: orders.filter((o: any) => o.status === 'do_raised').length,
    rollReady: orders.filter((o: any) => o.status === 'roll_ready').length,
    notAvailable: orders.filter((o: any) => o.status === 'not_available').length,
    todayProcessed: orders.filter((o: any) => 
      o.doRaisedAt && new Date(o.doRaisedAt).toDateString() === today
    ).length,
  };

  const pendingOrders = orders.filter((o: any) => o.status === 'new').slice(0, 5);
  const processingOrders = orders.filter((o: any) => o.status === 'do_raised').slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Godown Dashboard</h1>
        <p className="text-muted-foreground">Stock and delivery order management overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending DO</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDO}</div>
            <p className="text-xs text-muted-foreground">Awaiting DO</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DO Raised</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.doRaised}</div>
            <p className="text-xs text-muted-foreground">Preparing rolls</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roll Ready</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rollReady}</div>
            <p className="text-xs text-muted-foreground">Ready for dispatch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Processed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayProcessed}</div>
            <p className="text-xs text-muted-foreground">DOs raised today</p>
          </CardContent>
        </Card>

        <Card className={stats.notAvailable > 0 ? 'border-destructive' : ''}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Not Available</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.notAvailable}</div>
            <p className="text-xs text-muted-foreground">Out of stock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending DO Generation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No pending orders</p>
              ) : (
                pendingOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.length} item(s)
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
            <CardTitle>Roll Preparation In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {processingOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No orders in preparation</p>
              ) : (
                processingOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">DO: {order.doNumber}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
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

const DispatcherDashboard = ({ orders }: any) => {
  const today = new Date().toDateString();
  
  const stats = {
    readyForDispatch: orders.filter((o: any) => o.status === 'roll_ready').length,
    dispatched: orders.filter((o: any) => o.status === 'dispatched').length,
    todayDispatched: orders.filter((o: any) => 
      o.dispatchedAt && new Date(o.dispatchedAt).toDateString() === today
    ).length,
    totalDispatched: orders.filter((o: any) => o.status === 'dispatched' || o.status === 'delivered').length,
  };

  const readyOrders = orders.filter((o: any) => o.status === 'roll_ready').slice(0, 6);
  const recentDispatched = orders.filter((o: any) => o.status === 'dispatched').slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dispatcher Dashboard</h1>
        <p className="text-muted-foreground">Dispatch verification and approval overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready for Dispatch</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.readyForDispatch}</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispatched</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dispatched}</div>
            <p className="text-xs text-muted-foreground">Out for delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Dispatched</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayDispatched}</div>
            <p className="text-xs text-muted-foreground">Approved today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Dispatched</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDispatched}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {readyOrders.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No orders pending verification</p>
              ) : (
                readyOrders.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">DO: {order.doNumber}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
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
            <CardTitle>Recently Dispatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDispatched.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No dispatched orders</p>
              ) : (
                recentDispatched.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.dispatchedAt && format(new Date(order.dispatchedAt), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
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

const DeliveryManDashboard = ({ orders, currentUser }: any) => {
  const today = new Date().toDateString();
  
  const myDeliveries = orders.filter((o: any) => o.deliveredBy === currentUser.id);
  
  const stats = {
    pendingDelivery: orders.filter((o: any) => o.status === 'dispatched').length,
    todayDelivered: myDeliveries.filter((o: any) => 
      o.deliveredAt && new Date(o.deliveredAt).toDateString() === today
    ).length,
    totalDelivered: myDeliveries.length,
    inTransit: orders.filter((o: any) => o.status === 'dispatched').length,
  };

  const pendingDeliveries = orders.filter((o: any) => o.status === 'dispatched').slice(0, 6);
  const recentDeliveries = myDeliveries.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Delivery Dashboard</h1>
        <p className="text-muted-foreground">Your delivery assignments and performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Delivery</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingDelivery}</div>
            <p className="text-xs text-muted-foreground">Awaiting delivery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today Delivered</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayDelivered}</div>
            <p className="text-xs text-muted-foreground">Completed today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Delivered</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDelivered}</div>
            <p className="text-xs text-muted-foreground">By you</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inTransit}</div>
            <p className="text-xs text-muted-foreground">Out for delivery</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingDeliveries.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No pending deliveries</p>
              ) : (
                pendingDeliveries.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.address}</p>
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
            <CardTitle>My Recent Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentDeliveries.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No deliveries completed yet</p>
              ) : (
                recentDeliveries.map((order: any) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.deliveredAt && format(new Date(order.deliveredAt), 'MMM dd, HH:mm')}
                      </p>
                    </div>
                    <OrderStatusBadge status={order.status} />
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
