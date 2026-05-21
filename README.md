# RASMI ERP - Order Lifecycle Management System

A modern, enterprise-grade frontend application for managing the complete order lifecycle from receipt to delivery. Built with React, TypeScript, and Tailwind CSS with a Frappe ERPNext-inspired design.

## 🚀 Features

### Role-Based Access Control
- **Admin** - Full system access, analytics, and user management
- **Backup Office/Telecaller** - Order creation and status monitoring
- **Godown Incharge** - Stock management and DO (Delivery Order) generation
- **Dispatcher** - Roll verification and dispatch approval
- **Delivery Man** - Delivery execution with photo proof

### Order Workflow
1. **Order Creation** - Backup office receives and creates orders
2. **DO Generation** - Godown checks stock and raises delivery orders
3. **Roll Preparation** - Items are prepared and roll counts updated
4. **Dispatch Verification** - Dispatcher verifies roll count matches order
5. **Delivery** - Delivery man logs vehicle type, uploads photo proof, and confirms delivery

### Key Capabilities
- ✅ Real-time order status tracking
- ✅ Role-based dashboards and navigation
- ✅ Centralized state management with Zustand
- ✅ LocalStorage persistence for session data
- ✅ Mock data for demonstration
- ✅ Responsive design (mobile & desktop)
- ✅ Modern black/white theme
- ✅ Enterprise-grade UI components

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (custom implementation)
- **State Management**: Zustand with localStorage persistence
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 📁 Project Structure

```
rasmi-erp/
├── src/
│   ├── components/
│   │   ├── layout/          # Layout components (Sidebar, Header, MainLayout)
│   │   ├── ui/              # Reusable UI components (Button, Card, Input, Badge)
│   │   └── OrderStatusBadge.tsx
│   ├── lib/
│   │   ├── mockData.ts      # Mock data generators
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Login.tsx        # Authentication page
│   │   ├── Dashboard.tsx    # Admin dashboard
│   │   ├── Orders.tsx       # Order management (Backup Office)
│   │   ├── Godown.tsx       # Stock & DO management
│   │   ├── Dispatch.tsx     # Dispatch verification
│   │   ├── Delivery.tsx     # Delivery management
│   │   ├── Notifications.tsx
│   │   └── Users.tsx        # User management (Admin only)
│   ├── store/
│   │   └── index.ts         # Zustand store with persistence
│   ├── types/
│   │   └── index.ts         # TypeScript type definitions
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd rasmi-erp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:5173
```

## 👤 Demo Users

Use these credentials for quick login (or enter the email manually):

| Role | Email | Quick Login Button |
|------|-------|-------------------|
| Admin | admin@rasmi.com | Admin |
| Backup Office | rajesh@rasmi.com | Backup Office |
| Godown Incharge | suresh@rasmi.com | Godown |
| Dispatcher | amit@rasmi.com | Dispatcher |
| Delivery Man | vijay@rasmi.com | Delivery Man |

## 📊 Order Statuses

- **New** - Order created, awaiting DO
- **DO Raised** - Delivery order generated, preparing rolls
- **Not Available** - Item out of stock
- **Roll Ready** - Rolls prepared, awaiting dispatch
- **Dispatched** - Approved for delivery
- **Delivered** - Successfully delivered with proof

## 🎨 Design Philosophy

The application follows Frappe ERPNext's design principles:
- Clean, minimalist black and white color scheme
- Clear visual hierarchy
- Intuitive navigation
- Enterprise-grade aesthetics
- Responsive and accessible

## 🔧 State Management

The app uses Zustand for centralized state management with localStorage persistence:

```typescript
// Store includes:
- currentUser: User authentication
- orders: All order data
- customers: Customer information
- notifications: User notifications
- activityLogs: System activity tracking
- users: All system users
```

Data persists across browser sessions using localStorage.

## 🚀 Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

## 📝 Future Enhancements (Backend Integration)

When ready to add backend:
1. Replace mock data with API calls
2. Implement real authentication with JWT
3. Add WebSocket for real-time notifications
4. Integrate file upload for delivery photos
5. Add database persistence
6. Implement proper role-based authorization

## 📄 License

This project is for demonstration purposes.

---

**Built with ❤️ for RASMI Enterprises**
