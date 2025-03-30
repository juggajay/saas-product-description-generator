import React, { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import TagInput from '../components/ui/TagInput';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import openAIService from '../services/openai.service';

const Generate = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [productName, setProductName] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [featureInput, setFeatureInput] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [category, setCategory] = useState('');
  
  // Generated description state
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  
  // Tone options
  const toneOptions = [
    { value: '', label: 'Select a tone' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'professional', label: 'Professional' },
    { value: 'witty', label: 'Witty' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'casual', label: 'Casual' },
    { value: 'technical', label: 'Technical' },
    { value: 'enthusiastic', label: 'Enthusiastic' },
  ];
  
  // Category options
  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'home_decor', label: 'Home Decor' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'beauty', label: 'Beauty & Personal Care' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'sports', label: 'Sports & Outdoors' },
    { value: 'toys', label: 'Toys & Games' },
    { value: 'jewelry', label: 'Jewelry & Accessories' },
    { value: 'other', label: 'Other' },
  ];
  
  // Add feature to list
  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };
  
  // Remove feature from list
  const handleRemoveFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };
  
  // Add keyword
  const handleAddKeyword = (keyword: string) => {
    setKeywords([...keywords, keyword]);
  };
  
  // Remove keyword
  const handleRemoveKeyword = (index: number) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };
  
  // Generate description
  const handleGenerateDescription = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!productName) {
      setError('Product name is required');
      return;
    }
    
    if (features.length === 0) {
      setError('At least one feature/benefit is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      setSuccess(false);
      
      // Call OpenAI service
      const description = await openAIService.generateProductDescription(
        productName,
        features,
        targetAudience,
        tone,
        keywords,
        category
      );
      
      if (description) {
        setGeneratedDescription(description);
        setSuccess(true);
      } else {
        throw new Error('Failed to generate description. Please try again.');
      }
    } catch (err: any) {
      console.error('Error generating description:', err);
      setError(err.message || 'Failed to generate description. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Regenerate description
  const handleRegenerateDescription = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Call OpenAI service to regenerate
      const description = await openAIService.regenerateDescription(generatedDescription);
      
      if (description) {
        setGeneratedDescription(description);
      } else {
        throw new Error('Failed to regenerate description. Please try again.');
      }
    } catch (err: any) {
      console.error('Error regenerating description:', err);
      setError(err.message || 'Failed to regenerate description. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Copy to clipboard
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedDescription)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        setError('Failed to copy to clipboard. Please try manually selecting and copying the text.');
      });
  };
  
  // Save description
  const handleSaveDescription = () => {
    // This would typically save to a database
    // For now, we'll just show a success message
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Generate Description | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Generate Product Description</h1>
            
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Input Form */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Product Details
                </h2>
                
                {error && (
                  <Alert 
                    type="error" 
                    message={error} 
                    className="mb-4"
                    onClose={() => setError('')}
                  />
                )}
                
                <form onSubmit={handleGenerateDescription}>
                  <Input
                    id="product-name"
                    label="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g., Ergonomic Office Chair"
                    required
                    tooltip="Enter the exact name of your product"
                    disabled={loading}
                  />
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key Features/Benefits
                      <span className="text-red-500 ml-1">*</span>
                      <div className="tooltip ml-2 inline-block">
                        <span className="text-gray-400 hover:text-gray-500 cursor-help">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        <span className="tooltip-text">List the main features and benefits of your product</span>
                      </div>
                    </label>
                    
                    <div className="flex">
                      <Input
                        id="feature-input"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        placeholder="e.g., Adjustable lumbar support"
                        className="mb-0 flex-grow"
                        disabled={loading}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="ml-2"
                        onClick={handleAddFeature}
                        disabled={loading || !featureInput.trim()}
                      >
                        Add
                      </Button>
                    </div>
                    
                    {features.length > 0 && (
                      <div className="mt-2">
                        <ul className="bg-gray-50 rounded-md p-2 space-y-1">
                          {features.map((feature, index) => (
                            <li key={index} className="flex items-center justify-between text-sm">
                              <span>• {feature}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(index)}
                                className="text-red-500 hover:text-red-700"
                                disabled={loading}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <Input
                    id="target-audience"
                    label="Target Audience"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Office workers, Gamers, Parents"
                    tooltip="Who is this product designed for?"
                    disabled={loading}
                  />
                  
                  <Select
                    id="tone"
                    label="Desired Tone"
                    options={toneOptions}
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    tooltip="Select the tone that best matches your brand voice"
                    disabled={loading}
                  />
                  
                  <TagInput
                    id="keywords"
                    label="Target Keywords"
                    tags={keywords}
                    onAddTag={handleAddKeyword}
                    onRemoveTag={handleRemoveKeyword}
                    placeholder="Type and press Enter to add keywords"
                    tooltip="Add SEO keywords to include in the description"
                    disabled={loading}
                  />
                  
                  <Select
                    id="category"
                    label="Product Category"
                    options={categoryOptions}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    tooltip="Select the category that best fits your product"
                    disabled={loading}
                  />
                  
                  <div className="mt-6">
                    <Button
                      type="submit"
                      variant="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center">
                          <LoadingSpinner size="sm" color="white" />
                          <span className="ml-2">Generating...</span>
                        </div>
                      ) : (
                        'Generate Description'
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
              
              {/* Output Display */}
              <Card>
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Generated Description
                </h2>
                
                {success && (
                  <Alert 
                    type="success" 
                    message="Description saved successfully!" 
                    className="mb-4"
                  />
                )}
                
                {generatedDescription ? (
                  <>
                    <div className="bg-gray-50 rounded-md p-4 mb-4 h-64 overflow-y-auto">
                      <p className="whitespace-pre-wrap">{generatedDescription}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="primary"
                        onClick={handleCopyToClipboard}
                        disabled={loading}
                      >
                        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                      </Button>
                      
                      <Button
                        variant="secondary"
                        onClick={handleRegenerateDescription}
                        disabled={loading}
                      >
                        {loading ? (
                          <div className="flex items-center">
                            <LoadingSpinner size="sm" color="blue" />
                            <span className="ml-2">Regenerating...</span>
                          </div>
                        ) : (
                          'Regenerate'
                        )}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={handleSaveDescription}
                        disabled={loading}
                      >
                        Save
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => router.push('/shopify')}
                        disabled={loading}
                      >
                        Push to Shopify
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 rounded-md p-4 mb-4 h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <p>Fill in the product details and click "Generate Description" to create your AI-powered product description.</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Generate;
