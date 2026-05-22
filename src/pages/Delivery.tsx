import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useStore } from '../store';
import { Truck, Camera, CheckCircle } from 'lucide-react';
import OrderStatusBadge from '../components/OrderStatusBadge';
import type { Order, VehicleType } from '../types';

const Delivery = () => {
  const { orders, updateOrder, currentUser } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [vehicleType, setVehicleType] = useState<VehicleType>('truck');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const dispatchedOrders = orders.filter(o => o.status === 'dispatched');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarkDelivered = () => {
    if (!selectedOrder) return;

    updateOrder(selectedOrder.id, {
      status: 'delivered',
      deliveredAt: new Date().toISOString(),
      deliveredBy: currentUser?.id,
      vehicleType,
      deliveryPhoto: photoPreview || 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=400',
    });

    setSelectedOrder(null);
    setVehicleType('truck');
    setPhotoPreview('');
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Delivery Management</h1>
        <p className="text-gray-600">Manage deliveries and upload proof</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dispatchedOrders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter(o => {
                if (o.status !== 'delivered' || !o.deliveredAt) return false;
                const today = new Date().toDateString();
                return new Date(o.deliveredAt).toDateString() === today;
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Orders for Delivery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dispatchedOrders.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No orders for delivery</p>
            ) : (
              dispatchedOrders.map((order) => (
                <div
                  key={order.id}
                  className="border border-border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">DO: {order.doNumber}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                      <p className="text-sm text-muted-foreground">{order.customer.address}</p>
                    </div>
                    <OrderStatusBadge status={order.status} />
                  </div>

                  <div className="space-y-1 mb-3">
                    {order.items.map((item) => (
                      <p key={item.id} className="text-sm">
                        {item.productName} - Rolls: {item.rollCount || item.quantity}
                      </p>
                    ))}
                  </div>

                  <Button size="sm" onClick={() => setSelectedOrder(order)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Delivered
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedOrder(null)}>
          <Card className="max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <CardTitle>Complete Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Order: {selectedOrder.id}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customer.name}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Vehicle Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={vehicleType === 'bus' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVehicleType('bus')}
                  >
                    Bus
                  </Button>
                  <Button
                    variant={vehicleType === 'truck' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVehicleType('truck')}
                  >
                    Truck
                  </Button>
                  <Button
                    variant={vehicleType === 'other' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVehicleType('other')}
                  >
                    Other
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Delivery Photo</label>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                  ) : (
                    <div className="py-8">
                      <Camera className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Upload delivery photo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleMarkDelivered} className="flex-1">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Confirm Delivery
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

export default Delivery;
