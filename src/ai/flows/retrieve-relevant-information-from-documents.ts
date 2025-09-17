'use server';
/**
 * @fileOverview A tool to retrieve relevant information from uploaded documents.
 *
 * - retrieveRelevantInformationFromDocuments - A function that retrieves relevant information from documents.
 * - RetrieveRelevantInformationFromDocumentsInput - The input type for the retrieveRelevantInformationFromDocuments function.
 * - RetrieveRelevantInformationFromDocumentsOutput - The return type for the retrieveRelevantInformationFromDocuments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RetrieveRelevantInformationFromDocumentsInputSchema = z.object({
  query: z.string().describe('The query to search for in the documents.'),
  documents: z
    .array(z.string())
    .describe(
      'An array of documents, as data URIs that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type RetrieveRelevantInformationFromDocumentsInput =
  z.infer<typeof RetrieveRelevantInformationFromDocumentsInputSchema>;

const RetrieveRelevantInformationFromDocumentsOutputSchema = z.object({
  relevantInformation: z
    .string()
    .describe('The relevant information retrieved from the documents.'),
});
export type RetrieveRelevantInformationFromDocumentsOutput =
  z.infer<typeof RetrieveRelevantInformationFromDocumentsOutputSchema>;

export async function retrieveRelevantInformationFromDocuments(
  input: RetrieveRelevantInformationFromDocumentsInput
): Promise<RetrieveRelevantInformationFromDocumentsOutput> {
  return retrieveRelevantInformationFromDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'retrieveRelevantInformationFromDocumentsPrompt',
  input: {
    schema: RetrieveRelevantInformationFromDocumentsInputSchema,
  },
  output: {
    schema: RetrieveRelevantInformationFromDocumentsOutputSchema,
  },
  prompt: `You are an expert at extracting relevant information from documents.

  You will be provided with a query and a set of documents.

  Your task is to extract the information from the documents that is most relevant to the query.

  Query: {{{query}}}

  Documents:
  {{#each documents}}
  Document:
  {{{this}}}
  {{/each}}`,
});

const retrieveRelevantInformationFromDocumentsFlow = ai.defineFlow(
  {
    name: 'retrieveRelevantInformationFromDocumentsFlow',
    inputSchema: RetrieveRelevantInformationFromDocumentsInputSchema,
    outputSchema: RetrieveRelevantInformationFromDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
