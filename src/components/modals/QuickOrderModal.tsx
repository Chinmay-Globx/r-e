import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { X } from 'lucide-react';
import { useStore } from '../../store';
import type { OrderItem } from '../../types';

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickOrderModal = ({ isOpen, onClose }: QuickOrderModalProps) => {
  const { customers, currentUser, addOrder, addCustomer } = useStore();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    customerEmail: '',
    productName: '',
    quantity: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let customer = customers.find((c) => c.phone === formData.customerPhone);

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

    const newOrder = {
      id: `ORD-${String(Date.now()).slice(-6)}`,
      customerId: customer.id,
      customer,
      items: [orderItem],
      status: 'new' as const,
      createdAt: new Date().toISOString(),
      createdBy: currentUser?.id || '',
    };

    addOrder(newOrder);

    setFormData({
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      customerEmail: '',
      productName: '',
      quantity: '',
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Create New Order</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Customer Name *
                  </label>
                  <Input
                    required
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    placeholder="Enter customer name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Phone Number *
                  </label>
                  <Input
                    required
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, customerPhone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-1 block">
                    Address *
                  </label>
                  <Input
                    required
                    value={formData.customerAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, customerAddress: e.target.value })
                    }
                    placeholder="Enter delivery address"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, customerEmail: e.target.value })
                    }
                    placeholder="Enter email"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Order Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Product Name *
                  </label>
                  <Input
                    required
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">
                    Quantity *
                  </label>
                  <Input
                    required
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    placeholder="Enter quantity"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Create Order</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
