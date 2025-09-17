import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-business-plan-template.ts';
import '@/ai/flows/retrieve-relevant-information-from-documents.ts';
import '@/ai/flows/generate-business-plan-outline.ts';
import '@/ai/flows/generate-images-for-business-concepts.ts';
import '@/ai/tools/business-plan-guide.ts';
