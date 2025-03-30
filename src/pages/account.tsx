import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import stripeService from '../services/stripe.service';

const Account = () => {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Subscription state
  const [subscription, setSubscription] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [usageStats, setUsageStats] = useState({
    total: 0,
    limit: 0,
    percentage: 0,
  });
  
  // Fetch subscription data
  useEffect(() => {
    if (user?.subscription) {
      fetchSubscriptionData();
    } else {
      // Mock data for demo
      setUsageStats({
        total: 3,
        limit: 5,
        percentage: 60,
      });
    }
  }, [user]);
  
  // Fetch subscription data
  const fetchSubscriptionData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would fetch data from Stripe
      // Mock implementation
      const mockSubscription = {
        id: 'sub_123456',
        plan: 'basic',
        status: 'active',
        currentPeriodEnd: new Date().setMonth(new Date().getMonth() + 1),
      };
      
      const mockInvoices = [
        { id: 'inv_123', amount: 1900, status: 'paid', date: '2025-03-01' },
        { id: 'inv_456', amount: 1900, status: 'paid', date: '2025-02-01' },
      ];
      
      setSubscription(mockSubscription);
      setInvoices(mockInvoices);
      
      // Set usage stats
      setUsageStats({
        total: 25,
        limit: 50,
        percentage: 50,
      });
    } catch (err: any) {
      console.error('Error fetching subscription data:', err);
      setError(err.message || 'Failed to fetch subscription data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle plan upgrade
  const handleUpgradePlan = () => {
    router.push('/pricing');
  };
  
  // Handle plan cancellation
  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // In a real app, this would call Stripe to cancel the subscription
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Your subscription has been canceled. You will have access until the end of your current billing period.');
      
      // Update subscription status
      if (subscription) {
        setSubscription({
          ...subscription,
          status: 'canceled',
        });
      }
    } catch (err: any) {
      console.error('Error canceling subscription:', err);
      setError(err.message || 'Failed to cancel subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Account | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Account Settings</h1>
            
            {error && (
              <Alert 
                type="error" 
                message={error} 
                className="mt-4"
                onClose={() => setError('')}
              />
            )}
            
            {success && (
              <Alert 
                type="success" 
                message={success} 
                className="mt-4"
                onClose={() => setSuccess('')}
              />
            )}
            
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Subscription Card */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Subscription
                </h2>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner size="md" />
                  </div>
                ) : (
                  <>
                    {subscription ? (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-gray-600">
                              Current Plan: <span className="font-medium">{subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Status: <span className={`font-medium ${subscription.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                              </span>
                            </p>
                            {subscription.currentPeriodEnd && (
                              <p className="text-sm text-gray-500 mt-1">
                                Next billing date: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          
                          {subscription.status === 'active' ? (
                            <Button
                              variant="outline"
                              onClick={handleCancelSubscription}
                              disabled={loading}
                            >
                              Cancel Subscription
                            </Button>
                          ) : (
                            <Button
                              variant="primary"
                              onClick={handleUpgradePlan}
                              disabled={loading}
                            >
                              Reactivate
                            </Button>
                          )}
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-md font-medium text-gray-900 mb-2">
                            Usage
                          </h3>
                          
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
                          
                          {subscription.status === 'active' && (
                            <div className="mt-4">
                              <Button
                                variant="secondary"
                                onClick={handleUpgradePlan}
                                disabled={loading}
                              >
                                Upgrade Plan
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 mb-4">
                          You are currently on the Free Trial plan.
                        </p>
                        
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
                            {usageStats.limit - usageStats.total} descriptions remaining in your free trial
                          </p>
                        </div>
                        
                        <div className="mt-6">
                          <Button
                            variant="primary"
                            onClick={handleUpgradePlan}
                            disabled={loading}
                          >
                            Upgrade to Premium
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </Card>
              
              {/* Billing History Card */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Billing History
                </h2>
                
                {loading ? (
                  <div className="flex justify-center py-8">
                    <LoadingSpinner size="md" />
                  </div>
                ) : (
                  <>
                    {invoices.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Invoice
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {invoices.map((invoice) => (
                              <tr key={invoice.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatDate(invoice.date)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {formatCurrency(invoice.amount)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <a href="#" className="text-blue-600 hover:text-blue-900">
                                    Download
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 py-4">
                        No billing history available.
                      </p>
                    )}
                  </>
                )}
              </Card>
              
              {/* Payment Method Card */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Payment Method
                </h2>
                
                {subscription ? (
                  <div>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="flex-shrink-0">
                        <svg className="h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-900 font-medium">Visa ending in 4242</p>
                        <p className="text-gray-500 text-sm">Expires 12/2025</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => router.push('/update-payment')}
                    >
                      Update Payment Method
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No payment method on file. Add a payment method when you upgrade to a paid plan.
                  </p>
                )}
              </Card>
              
              {/* Account Settings Card */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Account Settings
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email Address</p>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Name</p>
                    <p className="mt-1 text-gray-900">{user?.name || 'Not set'}</p>
                  </div>
                  
                  <div className="pt-2 flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push('/update-profile')}
                    >
                      Update Profile
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => router.push('/change-password')}
                    >
                      Change Password
                    </Button>
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

export default Account;
