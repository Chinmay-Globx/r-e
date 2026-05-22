import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useStore } from '../store';
import { Package, CheckCircle, XCircle } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import type { Order } from '../types';

const Godown = () => {
  const { orders, updateOrder, currentUser } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [rollCounts, setRollCounts] = useState<{ [key: string]: string }>({});
  const [unavailableReason, setUnavailableReason] = useState('');

  const pendingOrders = orders.filter(o => o.status === 'new');
  const doRaisedOrders = orders.filter(o => o.status === 'do_raised');

  const handleRaiseDO = (order: Order) => {
    const generatedDO = `DO-${String(orders.filter(o => o.doNumber).length + 1).padStart(3, '0')}`;
    
    updateOrder(order.id, {
      status: 'do_raised',
      doNumber: generatedDO,
      doRaisedAt: new Date().toISOString(),
      doRaisedBy: currentUser?.id,
    });
    
    setSelectedOrder(null);
  };

  const handleMarkNotAvailable = (order: Order) => {
    updateOrder(order.id, {
      status: 'not_available',
      unavailableReason,
    });
    
    setSelectedOrder(null);
    setUnavailableReason('');
  };

  const handleMarkRollReady = (order: Order) => {
    const updatedItems = order.items.map(item => ({
      ...item,
      rollCount: parseInt(rollCounts[item.id] || String(item.quantity)),
    }));

    updateOrder(order.id, {
      status: 'roll_ready',
      items: updatedItems,
      rollReadyAt: new Date().toISOString(),
    });

    setSelectedOrder(null);
    setRollCounts({});
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Stock & DO Management</h1>
        <p className="text-gray-600">Manage inventory and delivery orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 shadow-soft hover-lift bg-gradient-to-br from-white to-amber-50/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Pending Orders</CardTitle>
            <div className="bg-amber-500 p-2 rounded-full">
              <Package className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">{pendingOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-soft hover-lift bg-gradient-to-br from-white to-sky-50/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">DO Raised</CardTitle>
            <div className="bg-sky-500 p-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-700">{doRaisedOrders.length}</div>
          </CardContent>
        </Card>

        <Card className="border-2 shadow-soft hover-lift bg-gradient-to-br from-white to-rose-50/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Not Available</CardTitle>
            <div className="bg-rose-500 p-2 rounded-full">
              <XCircle className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700">{orders.filter(o => o.status === 'not_available').length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-2 shadow-soft bg-gradient-to-br from-white to-amber-50/30">
          <CardHeader className="border-b bg-gradient-to-r from-amber-50 to-orange-50">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-amber-600" />
              New Orders - Raise DO
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 bg-white/50 backdrop-blur-sm">
            <div className="space-y-3">
              {pendingOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending orders</p>
              ) : (
                pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{order.id}</h3>
                        <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div className="space-y-1 mb-3">
                      {order.items.map((item) => (
                        <p key={item.id} className="text-sm">
                          {item.productName} - Qty: {item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleRaiseDO(order)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Raise DO
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => {
                          setSelectedOrder(order);
                          setUnavailableReason('');
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Not Available
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>DO Raised - Prepare Rolls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {doRaisedOrders.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No DO raised orders</p>
              ) : (
                doRaisedOrders.map((order) => (
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
                        <div key={item.id} className="space-y-1">
                          <p className="text-sm font-medium">{item.productName}</p>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              placeholder={`Qty: ${item.quantity}`}
                              value={rollCounts[item.id] || ''}
                              onChange={(e) => setRollCounts({ ...rollCounts, [item.id]: e.target.value })}
                              className="h-8 text-sm"
                            />
                            <span className="text-xs text-muted-foreground">rolls</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button size="sm" onClick={() => handleMarkRollReady(order)} className="w-full">
                      Mark Roll Ready
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Mark as Not Available</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Order: {selectedOrder.id}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer.name}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <Input
                  value={unavailableReason}
                  onChange={(e) => setUnavailableReason(e.target.value)}
                  placeholder="e.g., Out of stock - Expected in 3 days"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  onClick={() => handleMarkNotAvailable(selectedOrder)}
                  disabled={!unavailableReason}
                >
                  Confirm
                </Button>
                <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Godown;
