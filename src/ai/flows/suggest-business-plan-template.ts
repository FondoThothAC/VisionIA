'use server';
/**
 * @fileOverview Suggests a business plan template based on user input.
 *
 * - suggestBusinessPlanTemplate - A function that suggests a business plan template.
 * - SuggestBusinessPlanTemplateInput - The input type for the suggestBusinessPlanTemplate function.
 * - SuggestBusinessPlanTemplateOutput - The return type for the suggestBusinessPlanTemplate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBusinessPlanTemplateInputSchema = z.object({
  businessType: z.string().describe('The type of business (e.g., restaurant, tech startup).'),
  industry: z.string().describe('The industry the business operates in.'),
  businessModel: z.string().describe('The business model (e.g., subscription, e-commerce).'),
  companyDescription: z.string().describe('A brief description of the company and its goals.'),
});
export type SuggestBusinessPlanTemplateInput = z.infer<typeof SuggestBusinessPlanTemplateInputSchema>;

const SuggestBusinessPlanTemplateOutputSchema = z.object({
  suggestedTemplate: z.string().describe('The name of the suggested business plan template.'),
  reason: z.string().describe('The reasoning behind the template suggestion.'),
});
export type SuggestBusinessPlanTemplateOutput = z.infer<typeof SuggestBusinessPlanTemplateOutputSchema>;

export async function suggestBusinessPlanTemplate(input: SuggestBusinessPlanTemplateInput): Promise<SuggestBusinessPlanTemplateOutput> {
  return suggestBusinessPlanTemplateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBusinessPlanTemplatePrompt',
  input: {schema: SuggestBusinessPlanTemplateInputSchema},
  output: {schema: SuggestBusinessPlanTemplateOutputSchema},
  prompt: `Given the following business information, suggest the most suitable business plan template and explain your reasoning.\n\nBusiness Type: {{{businessType}}}\nIndustry: {{{industry}}}\nBusiness Model: {{{businessModel}}}\nCompany Description: {{{companyDescription}}}\n\nConsider templates for various industries and business models. If the user requests integration of \'Guía de Recursos Estándar para Planes y Modelos de Negocio\' information in its output, incorporate it as a tool upon user request.
`,
});

const suggestBusinessPlanTemplateFlow = ai.defineFlow(
  {
    name: 'suggestBusinessPlanTemplateFlow',
    inputSchema: SuggestBusinessPlanTemplateInputSchema,
    outputSchema: SuggestBusinessPlanTemplateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
