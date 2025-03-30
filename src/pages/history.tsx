import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Alert from '../components/ui/Alert';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const History = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');
  
  // Mock history data
  const [descriptions, setDescriptions] = useState([
    {
      id: 1,
      productName: 'Ergonomic Office Chair',
      description: 'Experience unparalleled comfort with our Ergonomic Office Chair, designed to support your body during long work hours. Featuring adjustable lumbar support, breathable mesh backing, and customizable armrests, this chair promotes proper posture and reduces strain. The premium cushioning and 5-point base provide stability and comfort that lasts throughout your workday. Elevate your office setup with this professional-grade chair that combines functionality with sleek design.',
      date: '2025-03-28',
      category: 'Furniture',
      tone: 'Professional'
    },
    {
      id: 2,
      productName: 'Wireless Noise-Cancelling Headphones',
      description: `Immerse yourself in pure audio bliss with our Wireless Noise-Cancelling Headphones. These premium headphones deliver crystal-clear sound while effectively blocking out ambient noise, creating your own peaceful sanctuary wherever you go. With 30 hours of battery life, comfortable over-ear design, and intuitive touch controls, they're perfect for work, travel, or relaxation. The sleek, modern aesthetic complements any style, making these headphones as fashionable as they are functional.`,
      date: '2025-03-27',
      category: 'Electronics',
      tone: 'Enthusiastic'
    },
    {
      id: 3,
      productName: 'Smart Home Hub',
      description: 'Transform your house into a connected home with our Smart Home Hub, the central command center for all your smart devices. This powerful yet compact hub seamlessly integrates with popular smart products including lights, thermostats, cameras, and speakers. Control everything through one intuitive app or with simple voice commands. The advanced automation features let you create custom routines that adapt to your lifestyle. With bank-level encryption and regular security updates, your connected home stays private and protected.',
      date: '2025-03-26',
      category: 'Electronics',
      tone: 'Technical'
    },
    {
      id: 4,
      productName: 'Organic Cotton Bedding Set',
      description: 'Drift into dreamland wrapped in the gentle embrace of our Organic Cotton Bedding Set. Crafted from 100% GOTS-certified organic cotton, this luxuriously soft bedding is free from harmful chemicals and pesticides, making it perfect for sensitive skin. The breathable fabric regulates temperature throughout the night, keeping you cool in summer and cozy in winter. Available in a palette of serene, nature-inspired colors, this bedding set adds a touch of sustainable luxury to your bedroom while supporting ethical farming practices.',
      date: '2025-03-25',
      category: 'Home Decor',
      tone: 'Luxury'
    },
    {
      id: 5,
      productName: 'Professional Blender',
      description: `Meet your kitchen's new best friend! Our Professional Blender tackles everything from silky smoothies to hearty soups with ease. The powerful 1200-watt motor and six precision-engineered blades pulverize even the toughest ingredients in seconds. We've designed the 64-ounce container with a special vortex shape that pulls ingredients down for consistent blending without the need for constant scraping. The intuitive control panel features pre-programmed settings for one-touch convenience. Cleanup is a breeze with the self-cleaning cycle and dishwasher-safe parts.`,
      date: '2025-03-24',
      category: 'Kitchen',
      tone: 'Friendly'
    }
  ]);
  
  // Category options
  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Home Decor', label: 'Home Decor' },
    { value: 'Kitchen', label: 'Kitchen' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Beauty', label: 'Beauty' }
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'name_asc', label: 'Product Name (A-Z)' },
    { value: 'name_desc', label: 'Product Name (Z-A)' }
  ];
  
  // Filter and sort descriptions
  const filteredDescriptions = descriptions
    .filter(desc => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          desc.productName.toLowerCase().includes(query) ||
          desc.description.toLowerCase().includes(query) ||
          desc.category.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(desc => {
      // Apply category filter
      if (filterCategory) {
        return desc.category === filterCategory;
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case 'date_asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'name_asc':
          return a.productName.localeCompare(b.productName);
        case 'name_desc':
          return b.productName.localeCompare(a.productName);
        case 'date_desc':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already applied via the filteredDescriptions
  };
  
  // Handle delete
  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this description?')) {
      setDescriptions(descriptions.filter(desc => desc.id !== id));
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <ProtectedRoute>
      <MainLayout title="Description History | AI Product Description Generator">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900">Description History</h1>
              
              <Button
                variant="primary"
                onClick={() => router.push('/generate')}
              >
                Generate New Description
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
            
            <Card className="mt-6">
              <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-grow">
                  <form onSubmit={handleSearch}>
                    <Input
                      id="search-query"
                      label="Search Descriptions"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by product name, content, or category..."
                    />
                  </form>
                </div>
                
                <div className="w-full md:w-48">
                  <Select
                    id="filter-category"
                    label="Category"
                    options={categoryOptions}
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  />
                </div>
                
                <div className="w-full md:w-48">
                  <Select
                    id="sort-by"
                    label="Sort By"
                    options={sortOptions}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  />
                </div>
              </div>
            </Card>
            
            <div className="mt-6">
              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <>
                  {filteredDescriptions.length > 0 ? (
                    <div className="space-y-6">
                      {filteredDescriptions.map(description => (
                        <Card key={description.id} className="overflow-hidden">
                          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-medium text-gray-900">
                                {description.productName}
                              </h3>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => router.push(`/generate?edit=${description.id}`)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDelete(description.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {description.category}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {description.tone}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                {formatDate(description.date)}
                              </span>
                            </div>
                          </div>
                          <div className="px-4 py-5 sm:p-6">
                            <p className="text-gray-700 whitespace-pre-wrap">
                              {description.description}
                            </p>
                          </div>
                          <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                            <div className="flex justify-end space-x-3">
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(description.description);
                                  setError('Description copied to clipboard!');
                                  setTimeout(() => setError(''), 3000);
                                }}
                              >
                                Copy to Clipboard
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => router.push('/shopify')}
                              >
                                Push to Shopify
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No descriptions found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchQuery || filterCategory ? 
                          'Try adjusting your search or filters.' : 
                          'Get started by generating your first product description.'}
                      </p>
                      <div className="mt-6">
                        <Button
                          variant="primary"
                          onClick={() => router.push('/generate')}
                        >
                          Generate New Description
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default History;
