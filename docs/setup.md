# AI Product Description Generator - Setup Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## Introduction

The AI Product Description Generator is a SaaS application designed for e-commerce merchants to generate high-quality, AI-powered product descriptions. This document provides instructions for setting up and running the application in development and production environments.

## Prerequisites

Before installing the application, ensure you have the following prerequisites:

- Node.js (v16.x or higher)
- npm (v8.x or higher)
- A Shopify Partner account (for Shopify integration)
- An OpenAI API key (for AI description generation)
- A Stripe account (for subscription and billing)

## Installation

Follow these steps to install the application:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-organization/product-description-generator.git
   cd product-description-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   cp .env.example .env.local
   ```

## Configuration

The application requires several environment variables to be configured:

### Core Configuration
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Authentication Configuration
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### OpenAI Configuration
```
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4
```

### Shopify Configuration
```
SHOPIFY_API_KEY=your-shopify-api-key
SHOPIFY_API_SECRET=your-shopify-api-secret
SHOPIFY_SCOPES=write_products,read_products
```

### Stripe Configuration
```
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

### Database Configuration
```
DATABASE_URL=your-database-connection-string
```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the application on http://localhost:3000.

### Production Mode

To build and run the application in production mode:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## Testing

The application includes comprehensive test suites for unit and integration testing.

### Running Tests

To run all tests:

```bash
./run_tests.sh
```

Or run specific test suites:

```bash
# Unit tests
npx jest app.test.js

# Integration tests
npx jest integration.test.js

# Linting
npx eslint src/

# TypeScript type checking
npx tsc --noEmit
```

## Deployment

The application can be deployed to various hosting platforms.

### Vercel Deployment

For the simplest deployment experience, use Vercel:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   vercel
   ```

3. For production deployment:
   ```bash
   vercel --prod
   ```

### Docker Deployment

The application can also be deployed using Docker:

1. Build the Docker image:
   ```bash
   docker build -t product-description-generator .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -e NODE_ENV=production product-description-generator
   ```

## Troubleshooting

### Common Issues

#### API Connection Issues

If you experience issues connecting to external APIs (OpenAI, Shopify, Stripe):

1. Verify your API keys are correctly set in the environment variables
2. Check that your network allows outbound connections to these services
3. Verify the API service status on their respective status pages

#### Database Connection Issues

If you experience database connection issues:

1. Verify your database connection string is correct
2. Ensure your database server is running and accessible
3. Check that your database user has the necessary permissions

#### Build Errors

If you encounter build errors:

1. Ensure all dependencies are installed: `npm install`
2. Clear the Next.js cache: `rm -rf .next`
3. Verify your Node.js version is compatible

For additional help, refer to the error logs in the admin dashboard or contact support.
