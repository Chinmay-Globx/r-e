import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useStore } from '../store';
import { mockUsers } from '../lib/mockData';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = mockUsers.find((u) => u.email === email);

    if (user) {
      setCurrentUser(user);
      navigate('/dashboard');
    } else {
      setError('Invalid email. Please try again.');
    }
  };

  const quickLogin = (userEmail: string) => {
    const user = mockUsers.find((u) => u.email === userEmail);
    if (user) {
      setCurrentUser(user);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">RASMI ERP</CardTitle>
          <CardDescription className="text-center">
            Order Lifecycle Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6">
            <p className="text-xs text-muted-foreground text-center mb-3">Quick Login (Demo)</p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('admin@rasmi.com')}
              >
                Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('rajesh@rasmi.com')}
              >
                Backup Office
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('suresh@rasmi.com')}
              >
                Godown
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('amit@rasmi.com')}
              >
                Dispatcher
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => quickLogin('vijay@rasmi.com')}
                className="col-span-2"
              >
                Delivery Man
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
