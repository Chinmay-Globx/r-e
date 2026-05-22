import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useStore } from '../store';
import { Truck, AlertTriangle } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import type { Order } from '../types';

const Dispatch = () => {
  const { orders, updateOrder, currentUser } = useStore();

  const rollReadyOrders = orders.filter(o => o.status === 'roll_ready');

  const handleApproveDispatch = (order: Order) => {
    const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalRolls = order.items.reduce((sum, item) => sum + (item.rollCount || 0), 0);

    if (totalQuantity !== totalRolls) {
      alert(`Mismatch! Order quantity: ${totalQuantity}, Roll count: ${totalRolls}`);
      return;
    }

    updateOrder(order.id, {
      status: 'dispatched',
      dispatchedAt: new Date().toISOString(),
      dispatchedBy: currentUser?.id,
    });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dispatch Management</h1>
        <p className="text-gray-600">Verify and approve orders for dispatch</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready for Dispatch</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rollReadyOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispatched Today</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => {
                if (o.status !== 'dispatched' || !o.dispatchedAt) return false;
                const today = new Date().toDateString();
                return new Date(o.dispatchedAt).toDateString() === today;
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders Ready for Dispatch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rollReadyOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No orders ready for dispatch</p>
            ) : (
              rollReadyOrders.map((order) => {
                const totalQuantity = order.items.reduce((sum, item) => sum + item.quantity, 0);
                const totalRolls = order.items.reduce((sum, item) => sum + (item.rollCount || 0), 0);
                const hasMismatch = totalQuantity !== totalRolls;

                return (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">DO: {order.doNumber}</p>
                        <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>

                    <div className="space-y-2 mb-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm border border-border rounded p-2">
                          <span>{item.productName}</span>
                          <div className="flex items-center gap-4">
                            <span>Qty: {item.quantity}</span>
                            <span className={item.rollCount !== item.quantity ? 'text-destructive font-medium' : ''}>
                              Rolls: {item.rollCount || 0}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Total:</span>
                        <span className="text-sm">Qty: {totalQuantity}</span>
                        <span className={`text-sm ${hasMismatch ? 'text-destructive font-medium' : ''}`}>
                          Rolls: {totalRolls}
                        </span>
                      </div>
                      
                      {hasMismatch ? (
                        <div className="flex items-center gap-2 text-destructive">
                          <AlertTriangle size={16} />
                          <span className="text-sm font-medium">Mismatch Detected</span>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => handleApproveDispatch(order)}>
                          <Truck className="mr-2 h-4 w-4" />
                          Approve Dispatch
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dispatch;
