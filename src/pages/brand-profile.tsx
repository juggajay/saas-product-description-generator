import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import TagInput from '../components/ui/TagInput';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const BrandProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [brandName, setBrandName] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [brandValues, setBrandValues] = useState<string[]>([]);
  const [brandTone, setBrandTone] = useState('');
  const [avoidWords, setAvoidWords] = useState<string[]>([]);
  const [preferredWords, setPreferredWords] = useState<string[]>([]);
  
  // Industry options
  const industryOptions = [
    { value: '', label: 'Select an industry' },
    { value: 'fashion', label: 'Fashion & Apparel' },
    { value: 'electronics', label: 'Electronics & Technology' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'jewelry', label: 'Jewelry & Accessories' },
    { value: 'art', label: 'Art & Crafts' },
    { value: 'books', label: 'Books & Media' },
    { value: 'pets', label: 'Pet Supplies' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'other', label: 'Other' }
  ];
  
  // Tone options
  const toneOptions = [
    { value: '', label: 'Select a tone' },
    { value: 'friendly', label: 'Friendly & Approachable' },
    { value: 'professional', label: 'Professional & Formal' },
    { value: 'luxury', label: 'Luxury & Sophisticated' },
    { value: 'casual', label: 'Casual & Relaxed' },
    { value: 'technical', label: 'Technical & Detailed' },
    { value: 'witty', label: 'Witty & Humorous' },
    { value: 'enthusiastic', label: 'Enthusiastic & Energetic' },
    { value: 'minimalist', label: 'Minimalist & Straightforward' }
  ];
  
  // Handle brand value addition
  const handleAddBrandValue = (value: string) => {
    setBrandValues([...brandValues, value]);
  };
  
  // Handle brand value removal
  const handleRemoveBrandValue = (index: number) => {
    const newValues = [...brandValues];
    newValues.splice(index, 1);
    setBrandValues(newValues);
  };
  
  // Handle avoid word addition
  const handleAddAvoidWord = (word: string) => {
    setAvoidWords([...avoidWords, word]);
  };
  
  // Handle avoid word removal
  const handleRemoveAvoidWord = (index: number) => {
    const newWords = [...avoidWords];
    newWords.splice(index, 1);
    setAvoidWords(newWords);
  };
  
  // Handle preferred word addition
  const handleAddPreferredWord = (word: string) => {
    setPreferredWords([...preferredWords, word]);
  };
  
  // Handle preferred word removal
  const handleRemovePreferredWord = (index: number) => {
    const newWords = [...preferredWords];
    newWords.splice(index, 1);
    setPreferredWords(newWords);
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!brandName) {
      setError('Brand name is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // In a real app, this would save the brand profile to a database
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess(true);
      
      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err: any) {
      console.error('Error saving brand profile:', err);
      setError(err.message || 'Failed to save brand profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Brand Voice Profile | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Brand Voice Profile</h1>
            </div>
            
            <p className="mt-2 text-gray-600">
              Define your brand's voice to generate product descriptions that match your brand identity.
            </p>
            
            <Card className="mt-6">
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
                  message="Brand profile saved successfully! Redirecting to dashboard..." 
                  className="mb-4"
                />
              )}
              
              <form onSubmit={handleSubmit}>
                <Input
                  id="brand-name"
                  label="Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g., Eco Essentials"
                  required
                  disabled={loading}
                />
                
                <Textarea
                  id="brand-description"
                  label="Brand Description"
                  value={brandDescription}
                  onChange={(e) => setBrandDescription(e.target.value)}
                  placeholder="Briefly describe your brand's mission and what makes it unique..."
                  rows={3}
                  disabled={loading}
                />
                
                <Select
                  id="industry"
                  label="Industry"
                  options={industryOptions}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={loading}
                />
                
                <Input
                  id="target-audience"
                  label="Target Audience"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g., Environmentally conscious millennials, Tech professionals"
                  disabled={loading}
                />
                
                <TagInput
                  id="brand-values"
                  label="Brand Values"
                  tags={brandValues}
                  onAddTag={handleAddBrandValue}
                  onRemoveTag={handleRemoveBrandValue}
                  placeholder="Type and press Enter to add values (e.g., Sustainability, Innovation)"
                  disabled={loading}
                />
                
                <Select
                  id="brand-tone"
                  label="Brand Tone"
                  options={toneOptions}
                  value={brandTone}
                  onChange={(e) => setBrandTone(e.target.value)}
                  disabled={loading}
                />
                
                <TagInput
                  id="preferred-words"
                  label="Preferred Words or Phrases"
                  tags={preferredWords}
                  onAddTag={handleAddPreferredWord}
                  onRemoveTag={handleRemovePreferredWord}
                  placeholder="Words you want to include in descriptions"
                  disabled={loading}
                />
                
                <TagInput
                  id="avoid-words"
                  label="Words or Phrases to Avoid"
                  tags={avoidWords}
                  onAddTag={handleAddAvoidWord}
                  onRemoveTag={handleRemoveAvoidWord}
                  placeholder="Words you want to exclude from descriptions"
                  disabled={loading}
                />
                
                <div className="mt-6 flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <LoadingSpinner size="sm" color="white" />
                        <span className="ml-2">Saving...</span>
                      </div>
                    ) : (
                      'Save Brand Profile'
                    )}
                  </Button>
                </div>
              </form>
            </Card>
            
            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">How Your Brand Profile Improves Descriptions</h2>
              <p className="mt-2 text-gray-600">
                Your brand profile helps our AI understand your unique voice and values. This ensures that all generated product descriptions:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Maintain consistent tone and messaging across all products</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Highlight your brand values in relevant product features</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Speak directly to your target audience's needs and preferences</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Use your preferred terminology and avoid unwanted language</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default BrandProfile;
