import React, { useState } from 'react';
import Link from 'next/link';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Alert from '../components/ui/Alert';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Mock knowledge base articles
  const knowledgeBaseArticles = [
    {
      id: 1,
      title: 'Getting Started with Product Descriptions',
      category: 'Getting Started',
      excerpt: 'Learn how to create your first AI-powered product description.',
      url: '/help/articles/getting-started'
    },
    {
      id: 2,
      title: 'Connecting Your Shopify Store',
      category: 'Integrations',
      excerpt: 'Step-by-step guide to connecting your Shopify store.',
      url: '/help/articles/shopify-integration'
    },
    {
      id: 3,
      title: 'Understanding Subscription Plans',
      category: 'Billing',
      excerpt: 'Details about our subscription plans and billing policies.',
      url: '/help/articles/subscription-plans'
    },
    {
      id: 4,
      title: 'Troubleshooting Shopify Connection Issues',
      category: 'Troubleshooting',
      excerpt: 'Common issues with Shopify integration and how to resolve them.',
      url: '/help/articles/shopify-troubleshooting'
    },
    {
      id: 5,
      title: 'Why Did My Generation Fail?',
      category: 'Troubleshooting',
      excerpt: 'Common reasons for description generation failures and solutions.',
      url: '/help/articles/generation-failures'
    },
    {
      id: 6,
      title: 'Creating an Effective Brand Voice Profile',
      category: 'Tips & Tricks',
      excerpt: 'How to define your brand voice for better descriptions.',
      url: '/help/articles/brand-voice'
    },
    {
      id: 7,
      title: 'Understanding Different Tones',
      category: 'Tips & Tricks',
      excerpt: 'Guide to selecting the right tone for your product descriptions.',
      url: '/help/articles/tones-guide'
    },
    {
      id: 8,
      title: 'Optimizing Descriptions for SEO',
      category: 'Tips & Tricks',
      excerpt: 'Best practices for SEO-friendly product descriptions.',
      url: '/help/articles/seo-optimization'
    }
  ];
  
  // Popular categories
  const categories = [
    { name: 'Getting Started', icon: '🚀', url: '/help/categories/getting-started' },
    { name: 'Troubleshooting', icon: '🔧', url: '/help/categories/troubleshooting' },
    { name: 'Integrations', icon: '🔌', url: '/help/categories/integrations' },
    { name: 'Billing', icon: '💳', url: '/help/categories/billing' },
    { name: 'Tips & Tricks', icon: '💡', url: '/help/categories/tips' }
  ];
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }
    
    // Simple search implementation
    const query = searchQuery.toLowerCase();
    const results = knowledgeBaseArticles.filter(article => 
      article.title.toLowerCase().includes(query) || 
      article.excerpt.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };
  
  return (
    <MainLayout title="Help Center | AI Product Description Generator">
      <div className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              How can we help you?
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Search our knowledge base or browse popular topics
            </p>
          </div>
          
          <div className="mt-8 max-w-3xl mx-auto">
            <form onSubmit={handleSearch}>
              <div className="flex rounded-md shadow-sm">
                <Input
                  id="search-query"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles..."
                  className="flex-grow rounded-r-none mb-0"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="rounded-l-none"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>
          
          {hasSearched && (
            <div className="mt-8 max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Search Results {searchResults.length > 0 ? `(${searchResults.length})` : ''}
              </h2>
              
              {searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map(article => (
                    <Card key={article.id} className="hover:shadow-md transition-shadow">
                      <Link href={article.url}>
                        <div className="cursor-pointer">
                          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                            {article.category}
                          </span>
                          <h3 className="mt-1 text-lg font-medium text-gray-900">
                            {article.title}
                          </h3>
                          <p className="mt-2 text-gray-600">
                            {article.excerpt}
                          </p>
                          <div className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Read more →
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert
                  type="info"
                  message={`No results found for "${searchQuery}". Please try a different search term or browse the categories below.`}
                />
              )}
            </div>
          )}
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Browse by Category
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {categories.map(category => (
                <Link key={category.name} href={category.url}>
                  <Card className="text-center hover:shadow-md transition-shadow cursor-pointer h-full">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {category.name}
                    </h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Popular Articles
            </h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {knowledgeBaseArticles.slice(0, 6).map(article => (
                <Link key={article.id} href={article.url}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <h3 className="mt-1 text-lg font-medium text-gray-900">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {article.excerpt}
                    </p>
                    <div className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Read more →
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Still need help?
            </h2>
            <p className="mt-2 text-gray-600">
              Our support team is ready to assist you with any questions or issues.
            </p>
            <div className="mt-4">
              <Button
                variant="primary"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Help;
