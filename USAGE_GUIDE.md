# RASMI ERP - Usage Guide

## Quick Start

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Access the application**
   - Open http://localhost:5173 in your browser

3. **Login**
   - Use the quick login buttons on the login page, or
   - Enter any of the demo user emails manually

---

## User Workflows

### 1. Admin User (`admin@rasmi.com`)

**Dashboard Access:**
- View overall system statistics
- Monitor order pipeline (New, In Progress, Delivered, Not Available)
- See recent orders and activity logs

**Capabilities:**
- Access all modules
- View user management
- Monitor system-wide activity
- Access all order statuses

**Navigation:**
- Dashboard - System overview
- Orders - All orders view
- Users - Manage system users
- Notifications - System notifications

---

### 2. Backup Office / Telecaller (`rajesh@rasmi.com`)

**Primary Role:** Order creation and monitoring

**Workflow:**
1. Click "Create Order" button
2. Fill in customer details:
   - Customer Name
   - Phone Number
   - Address
   - Email (optional)
3. Add product details:
   - Product Name
   - Quantity
4. Submit order
5. Monitor order status in real-time

**Features:**
- Create new orders
- View all orders with search functionality
- Click on orders to see detailed information
- Track order status from creation to delivery
- Receive notifications when orders become "Not Available"

---

### 3. Godown Incharge (`suresh@rasmi.com`)

**Primary Role:** Stock management and DO generation

**Workflow for Available Items:**
1. View "New Orders" in the left panel
2. Click "Raise DO" to generate Delivery Order
3. Order moves to "DO Raised" status
4. In right panel, enter roll counts for each item
5. Click "Mark Roll Ready" when preparation complete

**Workflow for Unavailable Items:**
1. View "New Orders"
2. Click "Not Available" button
3. Enter reason (e.g., "Out of stock - Expected in 3 days")
4. Submit

**Dashboard Stats:**
- Pending Orders (New)
- DO Raised count
- Not Available count

---

### 4. Dispatcher (`amit@rasmi.com`)

**Primary Role:** Verify roll counts and approve dispatch

**Workflow:**
1. View orders in "Roll Ready" status
2. Check each item's quantity vs roll count
3. **If counts match:**
   - Click "Approve Dispatch"
   - Order moves to "Dispatched" status
4. **If mismatch detected:**
   - System shows "Mismatch Detected" alert
   - Cannot approve until corrected

**Features:**
- Real-time mismatch detection
- Visual indicators for discrepancies
- Today's dispatch statistics

---

### 5. Delivery Man (`vijay@rasmi.com`)

**Primary Role:** Execute deliveries with proof

**Workflow:**
1. View "Orders for Delivery" (Dispatched status)
2. Click "Mark as Delivered" on an order
3. In the modal:
   - Select vehicle type (Bus / Truck / Other)
   - Upload delivery photo (optional in demo)
   - Click "Confirm Delivery"
4. Order status changes to "Delivered"

**Features:**
- View customer address for delivery
- See roll counts for verification
- Upload photo proof
- Track today's deliveries

---

## Order Status Flow

```
NEW
  ↓
DO RAISED (Godown raises DO)
  ↓
ROLL READY (Godown prepares rolls)
  ↓
DISPATCHED (Dispatcher approves)
  ↓
DELIVERED (Delivery man confirms)

Alternative path:
NEW → NOT AVAILABLE (Out of stock)
```

---

## Key Features to Explore

### 1. Real-Time Updates
- All changes reflect immediately across the system
- Activity logs track every action
- Order status updates in real-time

### 2. Role-Based Navigation
- Each role sees only relevant menu items
- Sidebar adapts based on user permissions
- Streamlined workflows per role

### 3. Search & Filter
- Search orders by ID or customer name
- Quick access to order details
- Modal popups for detailed views

### 4. Data Persistence
- All data saved to localStorage
- Survives browser refresh
- Session-based persistence

### 5. Responsive Design
- Works on desktop and mobile
- Hamburger menu on mobile devices
- Touch-friendly interface

---

## Testing the Complete Workflow

**Step-by-step test:**

1. **Login as Backup Office** (`rajesh@rasmi.com`)
   - Create a new order
   - Note the Order ID

2. **Logout and login as Godown Incharge** (`suresh@rasmi.com`)
   - Find your order in "New Orders"
   - Click "Raise DO"
   - Enter roll counts
   - Click "Mark Roll Ready"

3. **Logout and login as Dispatcher** (`amit@rasmi.com`)
   - Find your order in "Roll Ready"
   - Verify counts match
   - Click "Approve Dispatch"

4. **Logout and login as Delivery Man** (`vijay@rasmi.com`)
   - Find your order in "Dispatched"
   - Click "Mark as Delivered"
   - Select vehicle type
   - Upload photo (optional)
   - Confirm delivery

5. **Login as Admin** (`admin@rasmi.com`)
   - View dashboard statistics
   - Check activity logs
   - See completed order

---

## Mock Data

The application comes pre-loaded with:
- 6 sample orders in various statuses
- 5 customers
- 5 users (one per role)
- Activity logs for sample orders

You can create new orders and they will be added to the existing data.

---

## Clearing Data

To reset all data:
1. Open browser DevTools (F12)
2. Go to Application → Local Storage
3. Find `rasmi-erp-storage`
4. Delete the entry
5. Refresh the page

---

## Tips

- **Quick Login**: Use the role buttons on login page instead of typing emails
- **Order Details**: Click on any order card to see full details
- **Mobile Menu**: On mobile, tap the hamburger icon (☰) to open sidebar
- **Notifications**: Bell icon in header shows unread count
- **Activity Tracking**: Dashboard shows recent activity across all roles

---

## Common Scenarios

### Scenario 1: Out of Stock Item
1. Backup Office creates order
2. Godown Incharge marks as "Not Available" with reason
3. Backup Office sees notification and reason

### Scenario 2: Roll Count Mismatch
1. Godown enters wrong roll count
2. Dispatcher sees mismatch alert
3. Cannot approve until corrected

### Scenario 3: Complete Delivery
1. Order flows through all stages
2. Delivery man uploads photo proof
3. Order marked as delivered
4. Visible in dashboard statistics

---

## Browser Compatibility

Tested on:
- Chrome 120+
- Firefox 120+
- Edge 120+
- Safari 17+

---

## Support

For issues or questions, refer to the main README.md file.
