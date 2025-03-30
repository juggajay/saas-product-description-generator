import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';

const Pricing = () => {
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Plans data
  const plans = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      interval: 'month',
      descriptions: 5,
      features: [
        '5 AI-generated descriptions per month',
        'Basic editing tools',
        'Copy to clipboard',
        'Save descriptions',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 19,
      interval: 'month',
      descriptions: 50,
      features: [
        '50 AI-generated descriptions per month',
        'Advanced editing tools',
        'Shopify integration',
        'Save and organize descriptions',
        'Email support',
      ],
      cta: 'Subscribe to Basic',
      popular: true,
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 49,
      interval: 'month',
      descriptions: 200,
      features: [
        '200 AI-generated descriptions per month',
        'All Basic features',
        'Brand voice customization',
        'Bulk generation',
        'Priority support',
      ],
      cta: 'Subscribe to Pro',
      popular: false,
    },
  ];
  
  // Handle plan selection
  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };
  
  // Handle subscription
  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // In a real app, this would create a Stripe checkout session
      // and redirect the user to Stripe's checkout page
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (planId === 'free') {
        setSuccess('You have successfully started your free trial!');
      } else {
        setSuccess(`You have successfully subscribed to the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan!`);
      }
    } catch (err: any) {
      console.error('Error subscribing to plan:', err);
      setError(err.message || 'Failed to subscribe to plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MainLayout title="Pricing | AI Product Description Generator">
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that's right for your business
            </p>
          </div>
          
          {error && (
            <Alert 
              type="error" 
              message={error} 
              className="mt-8 max-w-md mx-auto"
              onClose={() => setError('')}
            />
          )}
          
          {success && (
            <Alert 
              type="success" 
              message={success} 
              className="mt-8 max-w-md mx-auto"
              onClose={() => setSuccess('')}
            />
          )}
          
          <div className="mt-12 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`flex flex-col h-full ${plan.popular ? 'border-2 border-blue-500 ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Popular
                  </div>
                )}
                
                <div className="p-6 flex-grow">
                  <h2 className="text-lg font-medium text-gray-900">{plan.name}</h2>
                  
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">${plan.price}</span>
                    <span className="ml-1 text-xl font-medium text-gray-500">/{plan.interval}</span>
                  </div>
                  
                  <p className="mt-4 text-sm text-gray-500">
                    {plan.descriptions} descriptions per month
                  </p>
                  
                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="ml-3 text-sm text-gray-700">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <Button
                    variant={plan.popular ? 'primary' : 'outline'}
                    fullWidth
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <div className="flex items-center justify-center">
                        <LoadingSpinner size="sm" color={plan.popular ? 'white' : 'blue'} />
                        <span className="ml-2">Processing...</span>
                      </div>
                    ) : (
                      plan.cta
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            
            <div className="mt-8 max-w-3xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Can I change plans later?</h3>
                  <p className="mt-2 text-gray-600">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of your next billing cycle.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">What happens if I exceed my monthly limit?</h3>
                  <p className="mt-2 text-gray-600">
                    You'll receive a notification when you're approaching your limit. Once you reach your limit, you can upgrade to a higher plan or wait until your next billing cycle.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Is there a long-term contract?</h3>
                  <p className="mt-2 text-gray-600">
                    No, all plans are month-to-month and you can cancel at any time. We also offer annual plans with a discount if you prefer.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Do you offer refunds?</h3>
                  <p className="mt-2 text-gray-600">
                    We offer a 14-day money-back guarantee if you're not satisfied with our service. Contact our support team for assistance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pricing;
