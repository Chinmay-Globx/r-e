import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useStore } from '../store';
import { Plus, Search } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { format } from 'date-fns';
import type { Order, OrderItem } from '../types';

const Orders = () => {
  const { orders, customers, currentUser, addOrder, addCustomer } = useStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerEmail: '',
    productName: '',
    quantity: '',
  });

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    let customer = customers.find(c => c.phone === formData.customerPhone);

    if (!customer) {
      customer = {
        id: `cust-${Date.now()}`,
        name: formData.customerName,
        phone: formData.customerPhone,
        address: formData.customerAddress,
        email: formData.customerEmail,
      };
      addCustomer(customer);
    }

    const orderItem: OrderItem = {
      id: `item-${Date.now()}`,
      productName: formData.productName,
      quantity: parseInt(formData.quantity),
    };

    const newOrder: Order = {
      id: `ORD-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, '0')}`,
      customerId: customer.id,
      customer,
      items: [orderItem],
      status: 'new',
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.id || 'system',
    };

    addOrder(newOrder);
    setShowCreateForm(false);
    setFormData({
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      customerEmail: '',
      productName: '',
      quantity: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-muted-foreground">Manage and track all orders</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Order
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Order</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Name</label>
                  <Input
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="Enter customer name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Phone</label>
                  <Input
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+91 9876543210"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Address</label>
                  <Input
                    required
                    value={formData.customerAddress}
                    onChange={(e) => setFormData({ ...formData, customerAddress: e.target.value })}
                    placeholder="Enter address"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer Email</label>
                  <Input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="customer@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Name</label>
                  <Input
                    required
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="Cotton Fabric Roll"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    required
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="50"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Order</Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No orders found</p>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{order.id}</h3>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.phone}</p>
                      <div className="mt-2">
                        {order.items.map((item) => (
                          <p key={item.id} className="text-sm">
                            {item.productName} - Qty: {item.quantity}
                            {item.rollCount && ` (Rolls: ${item.rollCount})`}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <p>{format(new Date(order.createdAt), 'MMM dd, yyyy')}</p>
                      <p>{format(new Date(order.createdAt), 'HH:mm')}</p>
                    </div>
                  </div>
                  {order.unavailableReason && (
                    <div className="mt-3 p-2 bg-destructive/10 border border-destructive/20 rounded text-sm">
                      <p className="font-medium text-destructive">Not Available</p>
                      <p className="text-muted-foreground">{order.unavailableReason}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order Details</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(null)}>✕</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Order ID</p>
                <p className="text-lg font-semibold">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <div className="mt-1">
                  <OrderStatusBadge status={selectedOrder.status} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer</p>
                <p className="font-medium">{selectedOrder.customer.name}</p>
                <p className="text-sm">{selectedOrder.customer.phone}</p>
                <p className="text-sm">{selectedOrder.customer.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="border border-border rounded p-3 mb-2">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    {item.rollCount && <p className="text-sm text-muted-foreground">Rolls: {item.rollCount}</p>}
                  </div>
                ))}
              </div>
              {selectedOrder.doNumber && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">DO Number</p>
                  <p>{selectedOrder.doNumber}</p>
                </div>
              )}
              {selectedOrder.vehicleType && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Vehicle Type</p>
                  <p className="capitalize">{selectedOrder.vehicleType}</p>
                </div>
              )}
              {selectedOrder.deliveryPhoto && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Delivery Photo</p>
                  <img src={selectedOrder.deliveryPhoto} alt="Delivery" className="rounded-lg w-full max-w-md" />
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Orders;
