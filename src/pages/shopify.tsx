import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import shopifyService from '../services/shopify.service';
import { useAuth } from '../contexts/AuthContext';

const ShopifyIntegration = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Shopify store state
  const [shopifyStore, setShopifyStore] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState([]);
  
  // Check if user has connected Shopify store
  useEffect(() => {
    if (user?.shopifyStore && user?.shopifyAccessToken) {
      setShopifyStore(user.shopifyStore);
      setIsConnected(true);
      fetchShopifyProducts();
    }
  }, [user]);
  
  // Handle OAuth callback
  // useEffect(() => {
  //   const { code, shop, state } = router.query;
  //
  //   if (code && shop && state) {
  //     // !! THIS NEEDS TO BE HANDLED SERVER-SIDE IN AN API ROUTE !!
  //     // completeOAuth(code.toString(), shop.toString(), state.toString());
  //   }
  // }, [router.query]);

  // Complete OAuth flow
  // !! THIS FUNCTIONALITY NEEDS TO BE MOVED TO A SERVER-SIDE API ROUTE !!
  // const completeOAuth = async (code: string, shop: string, state: string) => {
  //   try {
  //     setConnecting(true);
  //     setError('');
  //
  //     // Exchange code for access token (using the correct service method)
  //     // This requires req/res objects, hence server-side handling
  //     // const session = await shopifyService.validateAuthCallback(req, res, { code, shop, state, host }); // Example
  //
  //     // if (session?.accessToken) {
  //     //   // Update user profile with Shopify info
  //     //   // In a real app, this would update the user record in the database
  //     //   setShopifyStore(shop);
  //     //   setIsConnected(true);
  //     //   setSuccess('Successfully connected to your Shopify store!');
  //     //
  //     //   // Fetch products
  //     //   fetchShopifyProducts(session); // Pass session
  //     //
  //     //   // Remove query params from URL
  //     //   router.replace('/shopify', undefined, { shallow: true });
  //     // }
  //   } catch (err: any) {
  //     console.error('Error completing OAuth:', err);
  //     setError(err.message || 'Failed to connect to Shopify. Please try again.');
  //   } finally {
  //     setConnecting(false);
  //   }
  // };

  // Connect to Shopify
  const handleConnectShopify = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (!shopifyStore) {
        setError('Please enter your Shopify store URL');
        setLoading(false);
        return;
      }
      
      // Clean up store URL
      let store = shopifyStore.trim().toLowerCase();
      if (store.includes('https://')) {
        store = store.replace('https://', '');
      }
      if (store.includes('.myshopify.com')) {
        store = store.replace('.myshopify.com', '');
      }
      store = `${store}.myshopify.com`;
      
      // Generate OAuth URL - !! THIS MUST BE DONE SERVER-SIDE !!
      // The client-side cannot provide the required req/res objects.
      // Typically, you'd redirect the user to an API route like '/api/auth/begin?shop=...'
      // which would then call shopifyService.getAuthUrl(req, res, store, ...)
      // const redirectUri = `${window.location.origin}/shopify`; // Callback path on your app
      // const authUrl = await shopifyService.getAuthUrl(req, res, store, redirectUri); // Needs req, res

      // Redirect to Shopify for authorization - Handled by shopify.auth.begin on server-side
      // window.location.href = authUrl;
      setError('Shopify connection initiation needs server-side implementation.'); // Add error message
    } catch (err: any) {
      console.error('Error connecting to Shopify:', err);
      setError(err.message || 'Failed to connect to Shopify. Please try again.');
      setLoading(false);
    }
  };
  
  // Fetch products from Shopify
  const fetchShopifyProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // In a real app, you would use the stored access token
      // This is a mock implementation
      const mockProducts = [
        { id: '1', title: 'Ergonomic Office Chair', description: 'A comfortable chair for long work hours' },
        { id: '2', title: 'Standing Desk', description: 'Adjustable height desk for better posture' },
        { id: '3', title: 'Wireless Keyboard', description: 'Bluetooth keyboard with long battery life' },
      ];
      
      setProducts(mockProducts);
    } catch (err: any) {
      console.error('Error fetching Shopify products:', err);
      setError(err.message || 'Failed to fetch products from your Shopify store.');
    } finally {
      setLoading(false);
    }
  };
  
  // Disconnect Shopify
  const handleDisconnectShopify = async () => {
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would revoke the access token
      // and update the user record in the database
      setShopifyStore('');
      setIsConnected(false);
      setProducts([]);
      setSuccess('Successfully disconnected from your Shopify store.');
    } catch (err: any) {
      console.error('Error disconnecting from Shopify:', err);
      setError(err.message || 'Failed to disconnect from Shopify. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Push description to Shopify product
  const handlePushToShopify = async (productId: string, description: string) => {
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would call the Shopify API to update the product
      // This is a mock implementation
      setSuccess(`Successfully updated product description for product ID: ${productId}`);
    } catch (err: any) {
      console.error('Error pushing description to Shopify:', err);
      setError(err.message || 'Failed to update product description. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Shopify Integration | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Shopify Integration</h1>
            
            <div className="mt-6">
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Connect Your Shopify Store
                </h2>
                
                {error && (
                  <Alert 
                    type="error" 
                    message={error} 
                    className="mb-4"
                    onClose={() => setError('')}
                  />
                )}
                
                {success && (
                  <Alert 
                    type="success" 
                    message={success} 
                    className="mb-4"
                    onClose={() => setSuccess('')}
                  />
                )}
                
                {connecting && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <LoadingSpinner size="lg" />
                    <p className="mt-4 text-gray-600">Connecting to your Shopify store...</p>
                  </div>
                )}
                
                {!connecting && (
                  <>
                    {!isConnected ? (
                      <div>
                        <p className="text-gray-600 mb-4">
                          Connect your Shopify store to push generated product descriptions directly to your products.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <Input
                            id="shopify-store"
                            label="Shopify Store URL"
                            value={shopifyStore}
                            onChange={(e) => setShopifyStore(e.target.value)}
                            placeholder="your-store.myshopify.com"
                            tooltip="Enter your Shopify store URL"
                            disabled={loading}
                            className="flex-grow"
                          />
                          
                          <div className="flex items-end">
                            <Button
                              variant="primary"
                              onClick={handleConnectShopify}
                              disabled={loading || !shopifyStore}
                            >
                              {loading ? (
                                <div className="flex items-center">
                                  <LoadingSpinner size="sm" color="white" />
                                  <span className="ml-2">Connecting...</span>
                                </div>
                              ) : (
                                'Connect Store'
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <p className="text-gray-600">
                              Connected to: <span className="font-medium">{shopifyStore}</span>
                            </p>
                            <p className="text-sm text-green-600 mt-1">
                              Your Shopify store is successfully connected
                            </p>
                          </div>
                          
                          <Button
                            variant="outline"
                            onClick={handleDisconnectShopify}
                            disabled={loading}
                          >
                            Disconnect Store
                          </Button>
                        </div>
                        
                        <h3 className="text-md font-medium text-gray-900 mb-2">
                          Your Products
                        </h3>
                        
                        {loading ? (
                          <div className="flex justify-center py-8">
                            <LoadingSpinner size="md" />
                          </div>
                        ) : (
                          <>
                            {products.length > 0 ? (
                              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                                <ul className="divide-y divide-gray-200">
                                  {products.map((product: any) => (
                                    <li key={product.id}>
                                      <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                                        <div className="flex-1 min-w-0">
                                          <h4 className="text-sm font-medium text-gray-900 truncate">
                                            {product.title}
                                          </h4>
                                          <p className="mt-1 text-xs text-gray-500 truncate">
                                            {product.description || 'No description'}
                                          </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                          <Button
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => router.push(`/generate?product=${product.id}`)}
                                          >
                                            Generate Description
                                          </Button>
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ) : (
                              <p className="text-gray-500 py-4">
                                No products found in your Shopify store.
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default ShopifyIntegration;
