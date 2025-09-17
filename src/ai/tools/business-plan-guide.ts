'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { businessPlanGuide } from '@/lib/business-plan-guide';

export const businessPlanGuideTool = ai.defineTool(
  {
    name: 'businessPlanGuide',
    description: 'Provides a standard guide for creating a business plan.',
    outputSchema: z.any(),
  },
  async () => {
    return businessPlanGuide;
  }
);
