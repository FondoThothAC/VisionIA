'use server';
/**
 * @fileOverview Generates images representing key business concepts based on user descriptions.
 *
 * - generateImagesForBusinessConcepts - A function that generates images for business concepts.
 * - GenerateImagesForBusinessConceptsInput - The input type for the generateImagesForBusinessConcepts function.
 * - GenerateImagesForBusinessConceptsOutput - The return type for the generateImagesForBusinessConcepts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImagesForBusinessConceptsInputSchema = z.object({
  conceptDescription: z
    .string()
    .describe('A description of the business concept for which to generate an image.'),
});

type GenerateImagesForBusinessConceptsInput =
  z.infer<typeof GenerateImagesForBusinessConceptsInputSchema>;

const GenerateImagesForBusinessConceptsOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});

type GenerateImagesForBusinessConceptsOutput =
  z.infer<typeof GenerateImagesForBusinessConceptsOutputSchema>;

export async function generateImagesForBusinessConcepts(
  input: GenerateImagesForBusinessConceptsInput
): Promise<GenerateImagesForBusinessConceptsOutput> {
  return generateImagesForBusinessConceptsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImagesForBusinessConceptsPrompt',
  input: {schema: GenerateImagesForBusinessConceptsInputSchema},
  output: {schema: GenerateImagesForBusinessConceptsOutputSchema},
  prompt: `Generate an image representing the following business concept:\n\nConcept Description: {{{conceptDescription}}}`,
});

const generateImagesForBusinessConceptsFlow = ai.defineFlow(
  {
    name: 'generateImagesForBusinessConceptsFlow',
    inputSchema: GenerateImagesForBusinessConceptsInputSchema,
    outputSchema: GenerateImagesForBusinessConceptsOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: input.conceptDescription,
      model: 'googleai/imagen-4.0-fast-generate-001',
    });
    return {imageUrl: media.url!};
  }
);
