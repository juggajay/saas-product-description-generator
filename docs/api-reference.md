# AI Product Description Generator - API Reference

## Table of Contents
1. [Introduction](#introduction)
2. [Authentication](#authentication)
3. [Description Generation API](#description-generation-api)
4. [Shopify Integration API](#shopify-integration-api)
5. [Subscription API](#subscription-api)
6. [User Management API](#user-management-api)
7. [Error Handling](#error-handling)
8. [Rate Limiting](#rate-limiting)

## Introduction

This document provides a reference for the internal and external APIs used by the AI Product Description Generator application. The application uses RESTful API endpoints for server-side operations and integrates with third-party services including OpenAI, Shopify, and Stripe.

## Authentication

All API endpoints (except public endpoints) require authentication.

### Authentication Headers

```
Authorization: Bearer {access_token}
```

### Authentication Endpoints

#### POST /api/auth/login
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/register
Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST /api/auth/forgot-password
Initiates password recovery process.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset instructions sent to email"
}
```

## Description Generation API

### POST /api/descriptions/generate
Generates a product description using AI.

**Request Body:**
```json
{
  "productName": "Ergonomic Office Chair",
  "features": [
    "Adjustable height",
    "Lumbar support",
    "Breathable mesh back"
  ],
  "targetAudience": "Office professionals",
  "tone": "professional",
  "keywords": ["ergonomic", "comfortable", "office"],
  "category": "furniture",
  "brandProfileId": "brand_123"
}
```

**Response:**
```json
{
  "description": "Experience unparalleled comfort with our Ergonomic Office Chair...",
  "id": "desc_123"
}
```

### GET /api/descriptions
Retrieves a list of saved descriptions.

**Query Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Number of items per page
- `search` (optional): Search term
- `category` (optional): Filter by category
- `sort` (optional): Sort order (date_desc, date_asc, name_asc, name_desc)

**Response:**
```json
{
  "descriptions": [
    {
      "id": "desc_123",
      "productName": "Ergonomic Office Chair",
      "description": "Experience unparalleled comfort...",
      "date": "2025-03-28T10:15:30Z",
      "category": "furniture",
      "tone": "professional"
    },
    // More descriptions...
  ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

### GET /api/descriptions/:id
Retrieves a specific description.

**Response:**
```json
{
  "id": "desc_123",
  "productName": "Ergonomic Office Chair",
  "description": "Experience unparalleled comfort...",
  "features": ["Adjustable height", "Lumbar support", "Breathable mesh back"],
  "targetAudience": "Office professionals",
  "tone": "professional",
  "keywords": ["ergonomic", "comfortable", "office"],
  "category": "furniture",
  "date": "2025-03-28T10:15:30Z"
}
```

### PUT /api/descriptions/:id
Updates a saved description.

**Request Body:**
```json
{
  "productName": "Updated Product Name",
  "description": "Updated description text..."
}
```

**Response:**
```json
{
  "success": true,
  "description": {
    "id": "desc_123",
    "productName": "Updated Product Name",
    "description": "Updated description text...",
    // Other fields...
  }
}
```

### DELETE /api/descriptions/:id
Deletes a saved description.

**Response:**
```json
{
  "success": true
}
```

## Shopify Integration API

### GET /api/shopify/auth-url
Generates a Shopify OAuth URL.

**Query Parameters:**
- `shop`: Shopify store domain (e.g., "my-store.myshopify.com")

**Response:**
```json
{
  "authUrl": "https://my-store.myshopify.com/admin/oauth/authorize?client_id=..."
}
```

### POST /api/shopify/callback
Handles OAuth callback and exchanges code for access token.

**Request Body:**
```json
{
  "code": "oauth_code",
  "shop": "my-store.myshopify.com"
}
```

**Response:**
```json
{
  "success": true,
  "shop": "my-store.myshopify.com"
}
```

### GET /api/shopify/products
Retrieves products from connected Shopify store.

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "products": [
    {
      "id": "gid://shopify/Product/123",
      "title": "Product Name",
      "description": "Current description...",
      "images": [
        {
          "id": "gid://shopify/ProductImage/456",
          "src": "https://cdn.shopify.com/..."
        }
      ]
    },
    // More products...
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

### POST /api/shopify/push-description
Pushes a description to a Shopify product.

**Request Body:**
```json
{
  "productId": "gid://shopify/Product/123",
  "description": "New product description..."
}
```

**Response:**
```json
{
  "success": true,
  "product": {
    "id": "gid://shopify/Product/123",
    "title": "Product Name",
    "description": "New product description..."
  }
}
```

## Subscription API

### GET /api/subscription
Retrieves current subscription details.

**Response:**
```json
{
  "subscription": {
    "id": "sub_123",
    "plan": "basic",
    "status": "active",
    "currentPeriodEnd": "2025-04-28T00:00:00Z",
    "usage": {
      "descriptionsGenerated": 42,
      "limit": 100,
      "remaining": 58
    }
  }
}
```

### POST /api/subscription/create-checkout
Creates a Stripe checkout session for subscription.

**Request Body:**
```json
{
  "plan": "basic"
}
```

**Response:**
```json
{
  "checkoutUrl": "https://checkout.stripe.com/c/pay/..."
}
```

### POST /api/subscription/cancel
Cancels current subscription.

**Response:**
```json
{
  "success": true,
  "subscription": {
    "id": "sub_123",
    "status": "canceled"
  }
}
```

## User Management API

### GET /api/users/me
Retrieves current user profile.

**Response:**
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "user@example.com",
  "createdAt": "2025-03-01T10:00:00Z"
}
```

### PUT /api/users/me
Updates current user profile.

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "name": "Updated Name",
    "email": "newemail@example.com"
  }
}
```

### POST /api/users/change-password
Changes user password.

**Request Body:**
```json
{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true
}
```

## Error Handling

All API endpoints follow a consistent error response format:

```json
{
  "error": {
    "code": "invalid_input",
    "message": "Detailed error message",
    "details": {
      // Additional error details if available
    }
  }
}
```

### Common Error Codes

- `unauthorized`: Authentication required or invalid credentials
- `forbidden`: Insufficient permissions
- `not_found`: Resource not found
- `invalid_input`: Invalid request parameters
- `rate_limited`: Too many requests
- `service_unavailable`: External service unavailable
- `internal_error`: Unexpected server error

## Rate Limiting

API endpoints are subject to rate limiting to prevent abuse:

- Standard users: 60 requests per minute
- Premium users: 120 requests per minute

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
X-RateLimit-Reset: 1616979027
```

When rate limited, the API returns a 429 Too Many Requests status code with a response body:

```json
{
  "error": {
    "code": "rate_limited",
    "message": "Rate limit exceeded. Please try again in 45 seconds.",
    "details": {
      "retryAfter": 45
    }
  }
}
```
