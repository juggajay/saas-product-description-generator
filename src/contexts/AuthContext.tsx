import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of the user object
interface User {
  id: string;
  email: string;
  name?: string;
  shopifyStore?: string;
  shopifyAccessToken?: string;
  stripeCustomerId?: string;
  subscription?: {
    id: string;
    plan: string;
    status: string;
    currentPeriodEnd: number;
  };
}

// Define the shape of the auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  loginWithGoogle: async () => {},
  signup: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    // This would typically be an API call to check session/token validity
    const checkAuthStatus = async () => {
      try {
        setLoading(true);
        // For demo purposes, check localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError('Failed to authenticate user. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login with email and password
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would be an API call in a real application
      // For demo purposes, simulate a successful login
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const userData: User = {
          id: '123456',
          email: email,
          name: email.split('@')[0],
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Email and password are required');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      setError(err.message || 'Login failed. Please check your credentials and try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // This would integrate with Google OAuth in a real application
      // For demo purposes, simulate a successful login
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '789012',
        email: 'user@example.com',
        name: 'Google User',
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (err: any) {
      console.error('Google login failed:', err);
      setError(err.message || 'Google login failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up with email and password
  const signup = async (email: string, password: string, name?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would be an API call in a real application
      // For demo purposes, simulate a successful signup
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const userData: User = {
          id: '345678',
          email: email,
          name: name || email.split('@')[0],
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Email and password are required');
      }
    } catch (err: any) {
      console.error('Signup failed:', err);
      setError(err.message || 'Signup failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      
      // This would be an API call in a real application
      // For demo purposes, just clear local storage
      localStorage.removeItem('user');
      setUser(null);
    } catch (err: any) {
      console.error('Logout failed:', err);
      setError(err.message || 'Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would be an API call in a real application
      // For demo purposes, simulate a successful password reset request
      if (email) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, this would send a reset email
        console.log(`Password reset email sent to ${email}`);
      } else {
        throw new Error('Email is required');
      }
    } catch (err: any) {
      console.error('Password reset failed:', err);
      setError(err.message || 'Password reset failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      
      // This would be an API call in a real application
      // For demo purposes, simulate a successful profile update
      if (user) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update user data
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        throw new Error('User not authenticated');
      }
    } catch (err: any) {
      console.error('Profile update failed:', err);
      setError(err.message || 'Profile update failed. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Provide the auth context to children components
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        loginWithGoogle,
        signup,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
