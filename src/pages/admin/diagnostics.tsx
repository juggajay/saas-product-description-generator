import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ProtectedRoute from '../../components/auth/ProtectedRoute';

const Diagnostics = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [systemStatus, setSystemStatus] = useState({
    api: 'operational',
    database: 'operational',
    openai: 'operational',
    shopify: 'degraded',
    stripe: 'operational'
  });
  
  const [recentErrors, setRecentErrors] = useState([
    {
      id: 'err_123',
      timestamp: '2025-03-29T10:15:23Z',
      type: 'API Error',
      message: 'OpenAI API rate limit exceeded',
      user: 'user@example.com',
      status: 'resolved'
    },
    {
      id: 'err_124',
      timestamp: '2025-03-29T09:42:11Z',
      type: 'Integration Error',
      message: 'Shopify API connection timeout',
      user: 'store@example.com',
      status: 'investigating'
    },
    {
      id: 'err_125',
      timestamp: '2025-03-28T22:18:45Z',
      type: 'System Error',
      message: 'Database connection pool exhausted',
      user: 'system',
      status: 'resolved'
    }
  ]);
  
  const [systemMetrics, setSystemMetrics] = useState({
    activeUsers: 42,
    descriptionsGenerated: 156,
    averageResponseTime: 2.3,
    errorRate: 1.2,
    shopifyPushes: 28
  });
  
  // Run diagnostics
  const runDiagnostics = async () => {
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would run actual diagnostics
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update with mock results
      setSystemStatus({
        ...systemStatus,
        shopify: 'operational'
      });
      
    } catch (err: any) {
      console.error('Error running diagnostics:', err);
      setError(err.message || 'Failed to run diagnostics. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="System Diagnostics | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">System Diagnostics</h1>
              
              <Button
                variant="primary"
                onClick={runDiagnostics}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <LoadingSpinner size="sm" color="white" />
                    <span className="ml-2">Running Diagnostics...</span>
                  </div>
                ) : (
                  'Run Diagnostics'
                )}
              </Button>
            </div>
            
            {error && (
              <Alert 
                type="error" 
                message={error} 
                className="mt-4"
                onClose={() => setError('')}
              />
            )}
            
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* System Status Card */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  System Status
                </h2>
                
                <div className="space-y-4">
                  {Object.entries(systemStatus).map(([service, status]) => (
                    <div key={service} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`h-3 w-3 rounded-full mr-2 ${
                          status === 'operational' ? 'bg-green-500' : 
                          status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        <span className="text-gray-900 capitalize">{service}</span>
                      </div>
                      <span className={`text-sm font-medium ${
                        status === 'operational' ? 'text-green-600' : 
                        status === 'degraded' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-md font-medium text-gray-900 mb-2">
                    System Metrics
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Active Users</p>
                      <p className="text-lg font-medium text-gray-900">{systemMetrics.activeUsers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Descriptions Generated</p>
                      <p className="text-lg font-medium text-gray-900">{systemMetrics.descriptionsGenerated}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Avg. Response Time</p>
                      <p className="text-lg font-medium text-gray-900">{systemMetrics.averageResponseTime}s</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Error Rate</p>
                      <p className="text-lg font-medium text-gray-900">{systemMetrics.errorRate}%</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Recent Errors Card */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Recent Errors
                </h2>
                
                {recentErrors.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Message
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentErrors.map((error) => (
                          <tr key={error.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/admin/errors/${error.id}`)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatTimestamp(error.timestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {error.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {error.message}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                error.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                                error.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {error.status.charAt(0).toUpperCase() + error.status.slice(1)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 py-4">
                    No recent errors. System is running smoothly.
                  </p>
                )}
                
                <div className="mt-6">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/admin/errors')}
                  >
                    View All Errors
                  </Button>
                </div>
              </Card>
              
              {/* System Logs Card */}
              <Card className="lg:col-span-2">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  System Logs
                </h2>
                
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md h-64 overflow-y-auto font-mono text-sm">
                  <div className="text-green-400">[2025-03-29 10:45:12] INFO: System startup complete</div>
                  <div className="text-blue-400">[2025-03-29 10:46:23] DEBUG: User login successful: user@example.com</div>
                  <div className="text-blue-400">[2025-03-29 10:47:45] DEBUG: Description generation request received</div>
                  <div className="text-blue-400">[2025-03-29 10:47:48] DEBUG: OpenAI API request sent</div>
                  <div className="text-blue-400">[2025-03-29 10:47:52] DEBUG: OpenAI API response received</div>
                  <div className="text-yellow-400">[2025-03-29 10:48:15] WARN: Shopify API response delayed</div>
                  <div className="text-red-400">[2025-03-29 10:48:32] ERROR: Shopify API connection timeout</div>
                  <div className="text-blue-400">[2025-03-29 10:49:05] DEBUG: Retry Shopify API connection</div>
                  <div className="text-blue-400">[2025-03-29 10:49:12] DEBUG: Shopify API connection successful</div>
                  <div className="text-blue-400">[2025-03-29 10:50:23] DEBUG: User logout: user@example.com</div>
                  <div className="text-blue-400">[2025-03-29 10:52:45] DEBUG: New user registration: newuser@example.com</div>
                  <div className="text-blue-400">[2025-03-29 10:53:12] DEBUG: Welcome email sent to newuser@example.com</div>
                  <div className="text-blue-400">[2025-03-29 10:55:34] DEBUG: User login successful: newuser@example.com</div>
                  <div className="text-blue-400">[2025-03-29 10:56:45] DEBUG: Description generation request received</div>
                  <div className="text-blue-400">[2025-03-29 10:56:48] DEBUG: OpenAI API request sent</div>
                  <div className="text-blue-400">[2025-03-29 10:56:52] DEBUG: OpenAI API response received</div>
                  <div className="text-green-400">[2025-03-29 11:00:00] INFO: Hourly system health check: All systems operational</div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => router.push('/admin/logs')}
                  >
                    View Full Logs
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => console.log('Download logs')}
                  >
                    Download Logs
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Diagnostics;
