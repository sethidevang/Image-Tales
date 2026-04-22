'use server';
/**
 * @fileOverview Generates a story from an image.
 *
 * - generateStoryFromImage - A function that handles the story generation process.
 * - GenerateStoryFromImageInput - The input type for the generateStoryFromImage function.
 * - GenerateStoryFromImageOutput - The return type for the generateStoryFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStoryFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to inspire a story, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  apiKey: z.string().optional().describe('An optional Google AI API key to use for this generation.'),
});
export type GenerateStoryFromImageInput = z.infer<typeof GenerateStoryFromImageInputSchema>;

const GenerateStoryFromImageOutputSchema = z.object({
  story: z.string().describe('A short story inspired by the image.'),
});
export type GenerateStoryFromImageOutput = z.infer<typeof GenerateStoryFromImageOutputSchema>;

export async function generateStoryFromImage(input: GenerateStoryFromImageInput): Promise<GenerateStoryFromImageOutput> {
  return generateStoryFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateStoryFromImagePrompt',
  input: {schema: GenerateStoryFromImageInputSchema},
  output: {schema: GenerateStoryFromImageOutputSchema},
  prompt: `You are a creative story writer. You will generate a short story inspired by the image provided.  The story should be engaging and creative, adapting to any content detected, and use creative writing tools such as metaphor.

Image: {{media url=photoDataUri}}`,
});

const generateStoryFromImageFlow = ai.defineFlow(
  {
    name: 'generateStoryFromImageFlow',
    inputSchema: GenerateStoryFromImageInputSchema,
    outputSchema: GenerateStoryFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input, {
      config: {
        apiKey: input.apiKey,
      },
    });
    return output!;
  }
);
