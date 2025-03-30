# AI Product Description Generator - Application Structure

## Table of Contents
1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Services](#services)
5. [Pages](#pages)
6. [State Management](#state-management)
7. [API Routes](#api-routes)
8. [Utilities](#utilities)
9. [Troubleshooting System](#troubleshooting-system)
10. [Testing](#testing)

## Overview

The AI Product Description Generator is built using Next.js with TypeScript, providing a modern React framework with server-side rendering capabilities. The application follows a modular architecture with clear separation of concerns between UI components, business logic, and external service integrations.

## Directory Structure

```
saas-product-description-generator/
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   ├── layout/           # Layout components
│   │   ├── troubleshooting/  # Troubleshooting components
│   │   └── ui/               # Basic UI components
│   ├── contexts/             # React context providers
│   ├── pages/                # Next.js pages
│   │   ├── admin/            # Admin dashboard pages
│   │   ├── api/              # API routes
│   │   └── ...               # Other pages
│   ├── services/             # External service integrations
│   ├── styles/               # Global styles
│   └── utils/                # Utility functions
├── public/                   # Static assets
├── config/                   # Configuration files
├── tests/                    # Test files
├── docs/                     # Documentation
└── assets/                   # Design assets
```

## Core Components

### UI Components (`src/components/ui/`)

Basic UI components that form the building blocks of the application:

- `Button.tsx`: Customizable button component with variants
- `Input.tsx`: Form input component with validation
- `Select.tsx`: Dropdown select component
- `Textarea.tsx`: Multi-line text input component
- `Card.tsx`: Container component with consistent styling
- `Alert.tsx`: Notification component for success/error messages
- `LoadingSpinner.tsx`: Loading indicator
- `TagInput.tsx`: Component for entering and managing tags
- `Tooltip.tsx`: Hover tooltip for additional information

### Layout Components (`src/components/layout/`)

Components that define the overall structure of the application:

- `MainLayout.tsx`: Main layout wrapper with header and footer
- `Navbar.tsx`: Navigation bar with authentication state
- `Footer.tsx`: Application footer with links and information

### Authentication Components (`src/components/auth/`)

Components related to user authentication:

- `ProtectedRoute.tsx`: HOC for routes that require authentication

### Troubleshooting Components (`src/components/troubleshooting/`)

Components for the troubleshooting system:

- `ContextualHelp.tsx`: Tooltip-based contextual help
- `ProactiveTip.tsx`: Proactive tips and warnings
- `GuidedTroubleshooting.tsx`: Step-by-step troubleshooting flows
- `ErrorTracking.tsx`: Error display and reporting

## Services

External service integrations are encapsulated in service modules:

### OpenAI Service (`src/services/openai.service.ts`)

Handles communication with the OpenAI API for generating product descriptions:

- `generateProductDescription()`: Generates a description based on product details
- `regenerateDescription()`: Regenerates a description with variations

### Shopify Service (`src/services/shopify.service.ts`)

Manages Shopify store integration:

- `getAuthUrl()`: Generates OAuth authorization URL
- `getAccessToken()`: Exchanges authorization code for access token
- `getProducts()`: Retrieves products from connected store
- `pushDescription()`: Updates product descriptions in Shopify

### Stripe Service (`src/services/stripe.service.ts`)

Handles subscription and billing through Stripe:

- `createCheckoutSession()`: Creates a checkout session for subscription
- `getSubscription()`: Retrieves current subscription details
- `cancelSubscription()`: Cancels an active subscription

## Pages

The application uses Next.js pages for routing:

### Authentication Pages

- `login.tsx`: User login page
- `signup.tsx`: New user registration
- `forgot-password.tsx`: Password recovery

### Core Functionality Pages

- `index.tsx`: Landing page with product information
- `dashboard.tsx`: User dashboard with activity and stats
- `generate.tsx`: Main description generation interface
- `history.tsx`: History of generated descriptions
- `brand-profile.tsx`: Brand voice profile management

### Integration Pages

- `shopify.tsx`: Shopify store connection and product management

### Account Pages

- `account.tsx`: User account and subscription management
- `pricing.tsx`: Subscription plans and pricing

### Help Pages

- `help.tsx`: Knowledge base and help center
- `contact.tsx`: Support contact form

### Admin Pages

- `admin/index.tsx`: Admin dashboard
- `admin/diagnostics.tsx`: System diagnostics and monitoring

## State Management

The application uses React Context API for state management:

### Auth Context (`src/contexts/AuthContext.tsx`)

Manages authentication state and provides methods for:

- User login/logout
- Registration
- Password recovery
- Profile management

## API Routes

Next.js API routes handle server-side operations:

- `/api/auth/*`: Authentication endpoints (handled by NextAuth.js)
- `/api/descriptions`: CRUD operations for descriptions
- `/api/shopify`: Shopify integration endpoints
- `/api/stripe`: Subscription and billing endpoints
- `/api/users`: User management endpoints

## Utilities

Utility functions and helpers:

- `helpers.ts`: General utility functions
- `validation.ts`: Form validation helpers
- `formatting.ts`: Text and data formatting utilities
- `api.ts`: API request helpers

## Troubleshooting System

The troubleshooting system consists of multiple layers:

1. **User-Facing Components**:
   - Contextual help tooltips
   - Proactive tips and warnings
   - Knowledge base articles
   - Guided troubleshooting flows
   - Support contact options

2. **Internal Diagnostics**:
   - Error tracking and reporting
   - System health monitoring
   - Admin diagnostics dashboard
   - Comprehensive logging

## Testing

The application includes comprehensive test coverage:

- Unit tests for individual components
- Integration tests for service interactions
- End-to-end tests for critical user journeys

Tests are organized in the `tests/` directory:
- `app.test.js`: Unit tests for components and utilities
- `integration.test.js`: Integration tests for key workflows
- `run_tests.sh`: Script for running all tests
