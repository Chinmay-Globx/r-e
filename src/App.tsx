import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import { initializeMockData } from './lib/mockData';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Godown from './pages/Godown';
import Dispatch from './pages/Dispatch';
import Delivery from './pages/Delivery';
import Notifications from './pages/Notifications';
import Users from './pages/Users';
import MainLayout from './components/layout/MainLayout';

function App() {
  const currentUser = useStore((state) => state.currentUser);

  useEffect(() => {
    initializeMockData(useStore);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser ? <Navigate to="/dashboard" /> : <Login />} />
        
        {currentUser ? (
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/godown" element={<Godown />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/users" element={<Users />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
