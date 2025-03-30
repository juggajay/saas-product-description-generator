import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layout/MainLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Card from '../components/ui/Card';

const ForgotPassword = () => {
  const router = useRouter();
  const { resetPassword, error: authError, loading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Password reset failed. Please try again.');
    }
  };
  
  return (
    <MainLayout title="Reset Password | AI Product Description Generator">
      <div className="max-w-md mx-auto py-12">
        <Card>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
            <p className="text-gray-600 mt-2">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>
          
          {error && (
            <Alert 
              type="error" 
              message={error || authError || ''} 
              className="mb-4"
              onClose={() => setError('')}
            />
          )}
          
          {success && (
            <Alert 
              type="success" 
              message="Password reset email sent. Please check your inbox." 
              className="mb-4"
            />
          )}
          
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="sm" color="white" />
                      <span className="ml-2">Sending reset link...</span>
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>
              </div>
            </form>
          ) : (
            <div className="pt-2">
              <Button
                type="button"
                variant="primary"
                fullWidth
                onClick={() => router.push('/login')}
              >
                Return to Login
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/login">
                <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Sign in
                </span>
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ForgotPassword;
