import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import Textarea from '../components/ui/Textarea';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Category options
  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'account', label: 'Account Issues' },
    { value: 'billing', label: 'Billing Questions' },
    { value: 'shopify', label: 'Shopify Integration' },
    { value: 'generation', label: 'Description Generation' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'other', label: 'Other' },
  ];
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !subject || !category || !message) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would send the support request to a backend
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('');
      setCategory('');
      setMessage('');
    } catch (err: any) {
      console.error('Error submitting support request:', err);
      setError(err.message || 'Failed to submit support request. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <MainLayout title="Contact Support | AI Product Description Generator">
      <div className="py-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Contact Support
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              We're here to help with any questions or issues
            </p>
          </div>
          
          <Card className="mt-8">
            {success ? (
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="mt-4 text-lg font-medium text-gray-900">Support request submitted!</h2>
                <p className="mt-2 text-gray-600">
                  Thank you for contacting us. We'll get back to you as soon as possible.
                </p>
                <div className="mt-6">
                  <Button
                    variant="primary"
                    onClick={() => setSuccess(false)}
                  >
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <Alert 
                    type="error" 
                    message={error} 
                    className="mb-4"
                    onClose={() => setError('')}
                  />
                )}
                
                <Input
                  id="name"
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
                
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                
                <Input
                  id="subject"
                  label="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  disabled={loading}
                />
                
                <Select
                  id="category"
                  label="Category"
                  options={categoryOptions}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  disabled={loading}
                />
                
                <Textarea
                  id="message"
                  label="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                  disabled={loading}
                  placeholder="Please describe your issue or question in detail..."
                />
                
                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit Support Request'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
          
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Email Support</h3>
              <p className="mt-2 text-gray-600">
                support@productdescriber.com
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Support Hours</h3>
              <p className="mt-2 text-gray-600">
                Monday - Friday<br />
                9:00 AM - 6:00 PM EST
              </p>
            </Card>
            
            <Card className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Help Center</h3>
              <p className="mt-2 text-gray-600">
                Visit our knowledge base for self-service support
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/help'}
                >
                  Browse Help Articles
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;
