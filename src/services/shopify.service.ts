import {
  shopifyApi,
  ApiVersion,
  Session,
  AuthQuery
  // SessionStorage interface is not directly exported, removed import
} from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node'; // Import Node adapter
import { IncomingMessage, ServerResponse } from 'http'; // Use Node's HTTP types

// Define a type for the Shopify API instance returned by shopifyApi
type ShopifyApiInstance = ReturnType<typeof shopifyApi>;

// --- TEMPORARY In-Memory Session Storage (Replace for Production) ---
// This is a basic implementation for build purposes ONLY.
// Data will be lost on server restart. Use a persistent store in production.
// Removed 'implements SessionStorage' due to import issues in v11
class TempMemorySessionStorage {
  private sessions: Record<string, Session> = {};

  async storeSession(session: Session): Promise<boolean> {
    this.sessions[session.id] = session;
    return true;
  }
  async loadSession(id: string): Promise<Session | undefined> {
    return this.sessions[id];
  }
  async deleteSession(id: string): Promise<boolean> {
    if (this.sessions[id]) {
      delete this.sessions[id];
      return true;
    }
    return false;
  }
  async deleteSessions(ids: string[]): Promise<boolean> {
      ids.forEach(id => delete this.sessions[id]);
      return true;
  }
  async findSessionsByShop(shop: string): Promise<Session[]> {
      return Object.values(this.sessions).filter(session => session.shop === shop);
  }
}
// --- End Temporary Storage ---


class ShopifyService {
  private shopify: ShopifyApiInstance;
  // Using Temporary In-Memory Storage (Replace for Production)
  private sessionStorage = new TempMemorySessionStorage();

  constructor() {
    // Ensure required environment variables are set
    if (!process.env.SHOPIFY_API_KEY || !process.env.SHOPIFY_API_SECRET) {
      throw new Error("Shopify API Key or Secret is not configured. Please set SHOPIFY_API_KEY and SHOPIFY_API_SECRET environment variables.");
    }

    this.shopify = shopifyApi({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecretKey: process.env.SHOPIFY_API_SECRET,
      scopes: ['read_products', 'write_products'],
      hostName: process.env.HOST_NAME || 'localhost:3000', // Ensure this matches your setup
      apiVersion: ApiVersion.January23, // Or use LATEST_API_VERSION or specific version
      isEmbeddedApp: false,
      sessionStorage: this.sessionStorage, // Provide session storage object
      // Add other necessary configurations like logger, etc.
    });
  }

  /**
   * Generate OAuth URL for Shopify store connection.
   * NOTE: This method needs the actual HTTP request and response objects from your framework.
   */
  async getAuthUrl(req: IncomingMessage, res: ServerResponse, shop: string, redirectPath: string, isOnline: boolean = false): Promise<string> {
    try {
      // The redirect path should be the path on your app where Shopify redirects back
      // e.g., '/api/auth/callback'
      const authUrl = await this.shopify.auth.begin({
        shop: shop,
        callbackPath: redirectPath,
        isOnline: isOnline, // Use true for online tokens (per user), false for offline (permanent)
        rawRequest: req, // Pass the raw request object
        rawResponse: res // Pass the raw response object
      });
      // The library might handle the redirect itself depending on the adapter.
      // If not, you might need to manually redirect using the returned URL.
      return authUrl; // URL might not be needed if library handles redirect
    } catch (error: any) {
      console.error('Error generating Shopify auth URL:', error.message, error.response?.data);
      throw new Error(`Failed to generate Shopify authorization URL: ${error.message}`);
    }
  }

  /**
   * Complete OAuth flow and get session (includes access token).
   * NOTE: This method needs the actual HTTP request and response objects from your framework.
   */
  async validateAuthCallback(req: IncomingMessage, res: ServerResponse, query: AuthQuery): Promise<Session> {
     try {
       const callbackResponse = await this.shopify.auth.callback({
         // Pass the raw request/response objects
         rawRequest: req,
         rawResponse: res,
         // The library extracts necessary info (shop, host, code, state, etc.) from rawRequest query/body
       });
       // callbackResponse.session contains the access token and other session details
       // Session is automatically stored by the library via sessionStorage
       return callbackResponse.session;
     } catch (error: any) {
       console.error('Error validating Shopify auth callback:', error.message, error.response?.data);
       // Handle specific Shopify API errors if needed
       throw new Error(`Failed to authenticate with Shopify: ${error.message}`);
     }
   }

  /**
   * Get a REST client for a specific session
   */
  private getRestClient(session: Session): InstanceType<ShopifyApiInstance['clients']['Rest']> {
      // Ensure session is valid before creating client
      if (!session || !session.accessToken) {
          throw new Error("Invalid session provided to getRestClient.");
      }
      return new this.shopify.clients.Rest({ session });
  }

  /**
   * Get products from Shopify store using a valid session
   */
  async getProducts(session: Session, limit = 10) {
    try {
      const client = this.getRestClient(session);
      const response = await client.get({
        path: 'products',
        query: { limit: limit.toString() }
      });

      // Type assertion might be needed depending on how you handle the response
      return (response.body as any).products;
    } catch (error: any) {
      console.error('Error fetching Shopify products:', error.message, error.response?.data);
      throw new Error(`Failed to fetch products from Shopify: ${error.message}`);
    }
  }

  /**
   * Get a single product from Shopify store using a valid session
   */
  async getProduct(session: Session, productId: number | string) {
    try {
      const client = this.getRestClient(session);
      const response = await client.get({
        path: `products/${productId}`
      });

      return (response.body as any).product;
    } catch (error: any) {
      console.error('Error fetching Shopify product:', error.message, error.response?.data);
      throw new Error(`Failed to fetch product details: ${error.message}`);
    }
  }

  /**
   * Update product description in Shopify store using a valid session
   */
  async updateProductDescription(session: Session, productId: number | string, description: string) {
    try {
      const client = this.getRestClient(session);
      const response = await client.put({
        path: `products/${productId}`,
        data: {
          product: {
            id: productId,
            body_html: description
          }
        }
      });

      return (response.body as any).product;
    } catch (error: any) {
      console.error('Error updating Shopify product description:', error.message, error.response?.data);
      throw new Error(`Failed to update product description in Shopify: ${error.message}`);
    }
  }
}

export default new ShopifyService();
