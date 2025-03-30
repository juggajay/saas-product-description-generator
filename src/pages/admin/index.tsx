import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

const Admin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mock data for admin dashboard
  const [stats, setStats] = useState({
    totalUsers: 156,
    activeUsers: 124,
    totalDescriptions: 1842,
    todayDescriptions: 87,
    revenue: 4250,
    activeSubscriptions: 98
  });
  
  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: 'John Smith', email: 'john@example.com', plan: 'Pro', joined: '2025-03-25', status: 'active' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Basic', joined: '2025-03-26', status: 'active' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', plan: 'Free', joined: '2025-03-27', status: 'inactive' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', plan: 'Pro', joined: '2025-03-28', status: 'active' },
    { id: 5, name: 'David Wilson', email: 'david@example.com', plan: 'Basic', joined: '2025-03-29', status: 'active' }
  ]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Admin Dashboard | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin/diagnostics')}
                >
                  System Diagnostics
                </Button>
                <Button
                  variant="primary"
                  onClick={() => router.push('/admin/users')}
                >
                  Manage Users
                </Button>
              </div>
            </div>
            
            {error && (
              <Alert 
                type="error" 
                message={error} 
                className="mt-4"
                onClose={() => setError('')}
              />
            )}
            
            {/* Stats Cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalUsers}</dd>
                <dd className="mt-2 text-sm text-gray-500">{stats.activeUsers} active users</dd>
              </Card>
              
              <Card className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Descriptions Generated</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalDescriptions}</dd>
                <dd className="mt-2 text-sm text-gray-500">{stats.todayDescriptions} today</dd>
              </Card>
              
              <Card className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Monthly Revenue</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(stats.revenue)}</dd>
                <dd className="mt-2 text-sm text-gray-500">{stats.activeSubscriptions} active subscriptions</dd>
              </Card>
            </div>
            
            {/* Recent Users */}
            <Card className="mt-6">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Users</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.plan === 'Pro' ? 'bg-purple-100 text-purple-800' : 
                            user.plan === 'Basic' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.joined)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/users/${user.id}`)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => router.push('/admin/users')}
                >
                  View All Users
                </Button>
              </div>
            </Card>
            
            {/* Quick Actions */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="px-4 py-5 sm:p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/admin/reports')}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-500">View detailed reports</p>
                  </div>
                </div>
              </Card>
              
              <Card className="px-4 py-5 sm:p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/admin/billing')}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Billing</h3>
                    <p className="text-sm text-gray-500">Manage subscriptions</p>
                  </div>
                </div>
              </Card>
              
              <Card className="px-4 py-5 sm:p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/admin/settings')}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                    <p className="text-sm text-gray-500">Configure application</p>
                  </div>
                </div>
              </Card>
              
              <Card className="px-4 py-5 sm:p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => router.push('/admin/logs')}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Error Logs</h3>
                    <p className="text-sm text-gray-500">View system errors</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Admin;
