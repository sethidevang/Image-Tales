'use server';

import { generateStoryFromImage } from '@/ai/flows/generate-story-from-image';

export async function generateStoryAction(imageDataUri: string, apiKey?: string): Promise<{ story?: string; error?: string }> {
  if (!imageDataUri) {
    return { error: 'No image data provided.' };
  }

  try {
    const result = await generateStoryFromImage({ photoDataUri: imageDataUri, apiKey });
    if (result.story) {
      return { story: result.story };
    }
    return { error: 'Failed to generate a story. The result was empty.' };
  } catch (e: any) {
    console.error(e);
    
    // Check for rate limit, quota exceeded, or service busy errors
    const errorMessage = e instanceof Error ? e.message : String(e);
    const isQuotaExceeded = 
      e.status === 429 ||
      errorMessage.includes('429') || 
      errorMessage.toLowerCase().includes('quota exceeded') ||
      errorMessage.toLowerCase().includes('too many requests') ||
      errorMessage.toLowerCase().includes('resource_exhausted');

    const isServiceBusy = 
      e.status === 503 ||
      errorMessage.includes('503') ||
      errorMessage.toLowerCase().includes('high demand') ||
      errorMessage.toLowerCase().includes('service unavailable');

    if (isQuotaExceeded) {
      return { 
        error: 'Rate limit exceeded. Even with a new key, quotas are often shared across projects or take time to initialize. Please wait 10 minutes or enable billing for higher limits.' 
      };
    }

    if (isServiceBusy) {
      return {
        error: 'Google servers are currently experiencing high demand. Please try again in 30 seconds.'
      };
    }

    return { error: `An unexpected error occurred while generating the story. Details: ${errorMessage}` };
  }
}
