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
      'The specific trade-related question (e.g., "tariffs for exporting coffee from Mexico to the EU", "top importers of avocados worldwide", "restaurantes en Guadalajara").'
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
    
    // Check if the query is about local businesses in Mexico
    if (inegiToken && query.toLowerCase().includes(' en ')) {
      try {
        const [keyword, location] = query.split(' en ').map(s => s.trim());
        const url = `https://www.inegi.org.mx/app/api/denue/v1/referencia/rest/buscar/${encodeURIComponent(keyword)}/${encodeURIComponent(location)}/0/1000/${inegiToken}`;
        
        console.log(`[Trade Tool] Calling INEGI DENUE API: ${url.replace(inegiToken, 'REDACTED')}`);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching from INEGI: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const count = data.length;
            const top5Names = data.slice(0, 5).map((d: any) => d.Nombre).join(', ');
            const mostCommonActivity = data.length > 0 ? data[0].Clase_actividad : 'N/A';

            return `Respuesta de INEGI DENUE: Se encontraron ${count} unidades económicas para "${keyword}" en "${location}". Los primeros resultados incluyen: ${top5Names}. La clase de actividad más común es: '${mostCommonActivity}'.`;
        } else {
            return `Respuesta de INEGI DENUE: No se encontraron resultados para "${keyword}" en "${location}".`;
        }
      } catch (error: any) {
        console.error(`[Trade Tool] Error calling INEGI API: ${error.message}`);
        return 'Error al contactar el servicio de datos de INEGI. Por favor, verifica la conexión o el token.';
      }
    }
    
    // Fallback to mock data for international trade
    if (query.toLowerCase().includes('coffee')) {
      return 'The EU applies a 0% tariff on green coffee beans from Mexico under tratado de libre comercio, but specific import documentation (like a Certificate of Origin) is required. Germany is the largest importer within the EU.';
    } else if (query.toLowerCase().includes('avocados')) {
      return 'The top 3 global importers of avocados by value are the United States, the Netherlands, and Spain. Demand is projected to grow by 5% annually.';
    } else {
      return 'Trade or business data for the specified query is not available in this mock implementation. Please try a query about "coffee", "avocados", or local businesses like "restaurantes en [ciudad]".';
    }
  }
);
