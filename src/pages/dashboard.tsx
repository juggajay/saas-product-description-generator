import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock data for dashboard
  const [recentDescriptions, setRecentDescriptions] = useState([
    { id: 1, productName: 'Ergonomic Office Chair', date: '2025-03-28' },
    { id: 2, productName: 'Wireless Headphones', date: '2025-03-27' },
    { id: 3, productName: 'Smart Home Hub', date: '2025-03-26' },
  ]);
  
  const [usageStats, setUsageStats] = useState({
    total: 25,
    limit: 100,
    percentage: 25,
  });
  
  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log out. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateClick = () => {
    router.push('/generate');
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Dashboard | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            
            {error && (
              <Alert 
                type="error" 
                message={error} 
                className="mt-4"
                onClose={() => setError('')}
              />
            )}
            
            <div className="mt-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Welcome Card */}
                <Card className="col-span-1 sm:col-span-2">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">
                        Welcome back, {user?.name || 'User'}!
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        Ready to create compelling product descriptions?
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <Button
                        variant="primary"
                        onClick={handleGenerateClick}
                      >
                        Generate New Description
                      </Button>
                    </div>
                  </div>
                </Card>
                
                {/* Usage Stats Card */}
                <Card className="col-span-1">
                  <h2 className="text-lg font-medium text-gray-900">
                    Usage
                  </h2>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Descriptions Generated</span>
                      <span className="font-medium">{usageStats.total}/{usageStats.limit}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${usageStats.percentage}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      {usageStats.limit - usageStats.total} descriptions remaining in your plan
                    </p>
                  </div>
                </Card>
                
                {/* Recent Activity Card */}
                <Card className="col-span-1 sm:col-span-2">
                  <h2 className="text-lg font-medium text-gray-900">
                    Recent Activity
                  </h2>
                  {recentDescriptions.length > 0 ? (
                    <div className="mt-2 flow-root">
                      <ul className="-my-5 divide-y divide-gray-200">
                        {recentDescriptions.map((description) => (
                          <li key={description.id} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {description.productName}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  Generated on {description.date}
                                </p>
                              </div>
                              <div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/history/${description.id}`)}
                                >
                                  View
                                </Button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">
                      No recent descriptions. Start generating!
                    </p>
                  )}
                  {recentDescriptions.length > 0 && (
                    <div className="mt-6">
                      <Button
                        variant="secondary"
                        onClick={() => router.push('/history')}
                      >
                        View All History
                      </Button>
                    </div>
                  )}
                </Card>
                
                {/* Quick Links Card */}
                <Card className="col-span-1">
                  <h2 className="text-lg font-medium text-gray-900">
                    Quick Links
                  </h2>
                  <div className="mt-2 space-y-3">
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => router.push('/account')}
                    >
                      Account Settings
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => router.push('/brand-profile')}
                    >
                      Brand Profile
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => router.push('/shopify')}
                    >
                      Shopify Integration
                    </Button>
                    <Button
                      variant="outline"
                      fullWidth
                      onClick={() => router.push('/help')}
                    >
                      Help Center
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
