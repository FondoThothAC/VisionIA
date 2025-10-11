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
      'Provides information on trade tariffs, market access conditions, and trade flows using international data sources like ITC Trade Map or WCO. It can also query local business information for Mexico using the INEGI DENUE API.',
    inputSchema: TradeInfoSchema,
    outputSchema: z.string().describe('A summary of the requested trade or business data.'),
  },
  async ({query}) => {
    console.log(`[Trade Tool] Answering query: ${query}`);
    
    const inegiToken = process.env.INEGI_API_TOKEN;
    if (inegiToken) {
      console.log(`[Trade Tool] Found INEGI API Token: ${inegiToken.substring(0, 4)}...`);
    } else {
      console.log('[Trade Tool] INEGI API Token not found in environment variables.');
    }

    // In a real implementation, this would make an API call to ITC, WCO, or INEGI.
    // For now, we return a mock response based on the query.
    if (query.toLowerCase().includes('restaurantes')) {
        return `Simulación de respuesta de INEGI: Se encontraron 1,500 restaurantes en la zona consultada. Los 3 más comunes son 'Restaurante de comida corrida', 'Taquería' y 'Pizzería'. La mayoría son microempresas con 1-5 empleados.`;
    } else if (query.toLowerCase().includes('coffee')) {
      return 'The EU applies a 0% tariff on green coffee beans from Mexico under tratado de libre comercio, but specific import documentation (like a Certificate of Origin) is required. Germany is the largest importer within the EU.';
    } else if (query.toLowerCase().includes('avocados')) {
      return 'The top 3 global importers of avocados by value are the United States, the Netherlands, and Spain. Demand is projected to grow by 5% annually.';
    } else {
      return 'Trade or business data for the specified query is not available in this mock implementation. Please try a query about "coffee", "avocados", or local businesses like "restaurantes en [ciudad]".';
    }
  }
);
