'use server';

/**
 * @fileOverview Generates a business plan outline based on user input.
 *
 * - generateBusinessPlanOutline - A function that generates the business plan outline.
 * - BusinessPlanOutlineInput - The input type for the generateBusinessPlanOutline function.
 * - BusinessPlanOutlineOutput - The return type for the generateBusinessPlanOutline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getTradeInformation} from '@/ai/tools/business-plan-guide';

const BusinessPlanOutlineInputSchema = z.object({
  businessIdea: z
    .string()
    .describe('A description of the business idea for the business plan.'),
  targetMarket: z.string().describe('The target market for the business.'),
  competitiveAdvantages: z
    .string()
    .describe('The competitive advantages of the business.'),
  revenueModel: z.string().describe('How the business will generate revenue.'),
});
export type BusinessPlanOutlineInput = z.infer<
  typeof BusinessPlanOutlineInputSchema
>;

const BusinessPlanOutlineOutputSchema = z.object({
  outline: z.string().describe('The generated business plan outline.'),
});
export type BusinessPlanOutlineOutput = z.infer<
  typeof BusinessPlanOutlineOutputSchema
>;

export async function generateBusinessPlanOutline(
  input: BusinessPlanOutlineInput
): Promise<BusinessPlanOutlineOutput> {
  return generateBusinessPlanOutlineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBusinessPlanOutlinePrompt',
  input: {schema: BusinessPlanOutlineInputSchema},
  output: {schema: BusinessPlanOutlineOutputSchema},
  tools: [getTradeInformation],
  prompt: `You are an expert in creating business plan outlines.

  Based on the following information about the business idea, generate a detailed business plan outline.

  If the business idea involves importing or exporting goods, use the getTradeInformation tool to enrich the market analysis or financial projections sections with real-world data on tariffs or trade flows.

  Business Idea: {{{businessIdea}}}
  Target Market: {{{targetMarket}}}
  Competitive Advantages: {{{competitiveAdvantages}}}
  Revenue Model: {{{revenueModel}}}

  The outline should include the following sections:
  - Executive Summary
  - Company Description
  - Market Analysis
  - Organization and Management
  - Service or Product Line
  - Marketing and Sales Strategy
  - Funding Request (if applicable)
  - Financial Projections
  - Appendix

  Each section should have several subsections. Be detailed and comprehensive.
  `,
});

const generateBusinessPlanOutlineFlow = ai.defineFlow(
  {
    name: 'generateBusinessPlanOutlineFlow',
    inputSchema: BusinessPlanOutlineInputSchema,
    outputSchema: BusinessPlanOutlineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
