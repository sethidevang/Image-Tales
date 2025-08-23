'use server';
/**
 * @fileOverview Image keyword suggestion AI agent.
 *
 * - suggestKeywordsFromImage - A function that suggests keywords based on the image.
 * - SuggestKeywordsFromImageInput - The input type for the suggestKeywordsFromImage function.
 * - SuggestKeywordsFromImageOutput - The return type for the suggestKeywordsFromImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestKeywordsFromImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestKeywordsFromImageInput = z.infer<typeof SuggestKeywordsFromImageInputSchema>;

const SuggestKeywordsFromImageOutputSchema = z.object({
  keywords: z.array(z.string()).describe('An array of keywords extracted from the image.'),
});
export type SuggestKeywordsFromImageOutput = z.infer<typeof SuggestKeywordsFromImageOutputSchema>;

export async function suggestKeywordsFromImage(input: SuggestKeywordsFromImageInput): Promise<SuggestKeywordsFromImageOutput> {
  return suggestKeywordsFromImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestKeywordsFromImagePrompt',
  input: {schema: SuggestKeywordsFromImageInputSchema},
  output: {schema: SuggestKeywordsFromImageOutputSchema},
  prompt: `You are an expert AI image analyzer. Your task is to analyze the image and extract keywords or themes that can be used to generate stories.

  Return a list of keywords that best describe the image, suitable for story generation.

  Here is the image:
  {{media url=photoDataUri}}
  `,
});

const suggestKeywordsFromImageFlow = ai.defineFlow(
  {
    name: 'suggestKeywordsFromImageFlow',
    inputSchema: SuggestKeywordsFromImageInputSchema,
    outputSchema: SuggestKeywordsFromImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
