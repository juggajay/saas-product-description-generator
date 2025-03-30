import OpenAI from 'openai';

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    // Ensure the API key is available
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.");
    }

    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateProductDescription(
    productName: string,
    features: string[],
    targetAudience?: string,
    tone?: string,
    keywords?: string[],
    category?: string,
    brandProfile?: any // Consider defining a stronger type for brandProfile
  ) {
    try {
      // Construct the prompt based on the provided information
      let prompt = `Write a compelling product description for "${productName}".\n\n`;

      if (features && features.length > 0) {
        prompt += "Key Features/Benefits:\n";
        features.forEach(feature => {
          prompt += `- ${feature}\n`;
        });
        prompt += "\n";
      }

      if (targetAudience) {
        prompt += `Target Audience: ${targetAudience}\n\n`;
      }

      if (tone) {
        prompt += `Tone: ${tone}\n\n`;
      }

      if (keywords && keywords.length > 0) {
        prompt += `Keywords to include: ${keywords.join(', ')}\n\n`;
      }

      if (category) {
        prompt += `Product Category: ${category}\n\n`;
      }

      if (brandProfile) {
        prompt += `Brand Voice: ${brandProfile.description}\n`;
        if (brandProfile.tone) {
          prompt += `Brand Tone: ${brandProfile.tone}\n`;
        }
        prompt += "\n";
      }

      prompt += "The description should be engaging, highlight the key benefits, and be optimized for e-commerce.";

      // Call the OpenAI API using v4 syntax
      const response = await this.openai.completions.create({
        model: "text-davinci-003", // Note: Consider using newer models like gpt-3.5-turbo-instruct if available/preferred
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].text?.trim();
    } catch (error) {
      console.error('Error generating product description:', error);
      // Provide more specific error handling if possible
      if (error instanceof OpenAI.APIError) {
          console.error('OpenAI API Error:', error.status, error.message, error.code, error.type);
          throw new Error(`OpenAI API Error: ${error.message}`);
      }
      throw new Error('Failed to generate product description. Please try again later.');
    }
  }

  async regenerateDescription(
    previousDescription: string,
    feedback?: string
  ) {
    try {
      let prompt = `Rewrite the following product description to make it more compelling and engaging:\n\n${previousDescription}\n\n`;

      if (feedback) {
        prompt += `Consider this feedback: ${feedback}\n\n`;
      }

      const response = await this.openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7,
      });

      return response.choices[0].text?.trim();
    } catch (error) {
      console.error('Error regenerating product description:', error);
       if (error instanceof OpenAI.APIError) {
          console.error('OpenAI API Error:', error.status, error.message, error.code, error.type);
          throw new Error(`OpenAI API Error: ${error.message}`);
      }
      throw new Error('Failed to regenerate product description. Please try again later.');
    }
  }
}

export default new OpenAIService();
