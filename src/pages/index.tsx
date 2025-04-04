import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>AI Product Description Generator</title>
        <meta name="description" content="Generate AI-powered product descriptions for your e-commerce store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          AI Product Description Generator
        </h1>
        <p className="text-center text-xl mb-12">
          Create compelling, SEO-optimized product descriptions for your e-commerce store
        </p>
        
        {/* Test element with custom CSS classes */}
        <div className="test-bg p-4 mb-6 rounded-lg mx-auto max-w-md">
          <p className="test-text text-center">
            This is a test element with custom CSS classes to verify CSS loading
          </p>
        </div>
        
        <div className="max-w-md mx-auto card custom-card">
          <p className="text-center mb-6">
            Sign in to get started or create a new account
          </p>
          <div className="flex flex-col space-y-4">
            <button className="btn btn-primary sign-in-button">
              Sign In
            </button>
            <button className="btn btn-secondary create-account-button">
              Create Account
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
