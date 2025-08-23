'use server';

import { generateStoryFromImage } from '@/ai/flows/generate-story-from-image';

export async function generateStoryAction(imageDataUri: string): Promise<{ story?: string; error?: string }> {
  if (!imageDataUri) {
    return { error: 'No image data provided.' };
  }

  try {
    const result = await generateStoryFromImage({ photoDataUri: imageDataUri });
    if (result.story) {
      return { story: result.story };
    }
    return { error: 'Failed to generate a story. The result was empty.' };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `An unexpected error occurred while generating the story. Details: ${errorMessage}` };
  }
}
