import Stripe from 'stripe';

class StripeService {
  private stripe: Stripe;
  
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2025-02-24.acacia', // Updated to match installed library expectation
    });
  }
  
  /**
   * Create a new customer in Stripe
   */
  async createCustomer(email: string, name?: string) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
      });
      
      return customer;
    } catch (error) {
      console.error('Error creating Stripe customer:', error);
      throw new Error('Failed to create customer account. Please try again later.');
    }
  }
  
  /**
   * Create a subscription for a customer
   */
  async createSubscription(customerId: string, priceId: string) {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });
      
      return subscription;
    } catch (error) {
      console.error('Error creating Stripe subscription:', error);
      throw new Error('Failed to create subscription. Please try again later.');
    }
  }
  
  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error retrieving Stripe subscription:', error);
      throw new Error('Failed to retrieve subscription details. Please try again later.');
    }
  }
  
  /**
   * Cancel a subscription
   */
  async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error canceling Stripe subscription:', error);
      throw new Error('Failed to cancel subscription. Please try again later.');
    }
  }
  
  /**
   * Update customer payment method
   */
  async updateCustomerPaymentMethod(customerId: string, paymentMethodId: string) {
    try {
      await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId,
      });
      
      await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      
      return true;
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw new Error('Failed to update payment method. Please try again later.');
    }
  }
  
  /**
   * Get customer's invoices
   */
  async getCustomerInvoices(customerId: string, limit = 10) {
    try {
      const invoices = await this.stripe.invoices.list({
        customer: customerId,
        limit,
      });
      
      return invoices.data;
    } catch (error) {
      console.error('Error retrieving customer invoices:', error);
      throw new Error('Failed to retrieve billing history. Please try again later.');
    }
  }
  
  /**
   * Get subscription usage
   */
  async getSubscriptionUsage(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['items.data.price.product'],
      });
      
      // This is a simplified example. In a real application, you would need to
      // track usage with Stripe's usage record API or in your own database
      return {
        subscription,
        // Additional usage data would be calculated here
      };
    } catch (error) {
      console.error('Error retrieving subscription usage:', error);
      throw new Error('Failed to retrieve usage information. Please try again later.');
    }
  }
}

export default new StripeService();
