'use server';
/**
 * @fileOverview Defines a Genkit tool for retrieving information from the "Guía de Recursos Estándar para Planes y Modelos de Negocio".
 *
 * - businessPlanGuideTool - A tool that provides information from the guide.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TradeInfoSchema = z.object({
  query: z
    .string()
    .describe(
      'The specific trade-related question (e.g., "tariffs for exporting coffee from Mexico to the EU", "top importers of avocados worldwide").'
    ),
});

export const getTradeInformation = ai.defineTool(
  {
    name: 'getTradeInformation',
    description:
      'Provides information on trade tariffs, market access conditions, and trade flows using international data sources like ITC Trade Map or WCO. Use this for business plans involving import or export.',
    inputSchema: TradeInfoSchema,
    outputSchema: z.string().describe('A summary of the requested trade data.'),
  },
  async ({query}) => {
    console.log(`[Trade Tool] Answering query: ${query}`);
    // In a real implementation, this would make an API call to ITC, WCO, or another trade data provider.
    // For now, we return a mock response based on the query.
    if (query.toLowerCase().includes('coffee')) {
      return 'The EU applies a 0% tariff on green coffee beans from Mexico under tratado de libre comercio, but specific import documentation (like a Certificate of Origin) is required. Germany is the largest importer within the EU.';
    } else if (query.toLowerCase().includes('avocados')) {
      return 'The top 3 global importers of avocados by value are the United States, the Netherlands, and Spain. Demand is projected to grow by 5% annually.';
    } else {
      return 'Trade data for the specified query is not available in this mock implementation. Please try a query about "coffee" or "avocados".';
    }
  }
);
