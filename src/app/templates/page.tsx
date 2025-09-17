"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Wand2, Download } from 'lucide-react';
import { suggestBusinessPlanTemplate } from '@/ai/flows/suggest-business-plan-template';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/page-header';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  businessType: z.string().min(3, 'Please enter a valid business type.'),
  industry: z.string().min(3, 'Please enter a valid industry.'),
  businessModel: z.string().min(3, 'Please describe your business model.'),
  companyDescription: z.string().min(10, 'Please provide a brief company description.'),
});

type FormData = z.infer<typeof formSchema>;

const templates = [
  { name: 'Tech Startup', description: 'For innovative technology companies seeking venture capital.' },
  { name: 'E-commerce Store', description: 'Perfect for online retailers and digital storefronts.' },
  { name: 'Restaurant & Cafe', description: 'A detailed plan for food and beverage businesses.' },
  { name: 'Non-Profit Organization', description: 'Tailored for organizations with a social mission.' },
  { name: 'Service-Based Business', description: 'For consultants, freelancers, and agencies.' },
  { name: 'Retail Business', description: 'A comprehensive plan for brick-and-mortar stores.' },
];

export default function TemplatesPage() {
  const [suggestion, setSuggestion] = useState<{ suggestedTemplate: string; reason: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: '',
      industry: '',
      businessModel: '',
      companyDescription: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      toast({
        title: 'Finding Your Template...',
        description: 'The AI is analyzing your business needs.',
      });
      const result = await suggestBusinessPlanTemplate(values);
      setSuggestion(result);
      toast({
        title: 'Suggestion Ready!',
        description: `We recommend the "${result.suggestedTemplate}" template.`,
      });
    } catch (error) {
      console.error('Error suggesting template:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get a suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Template Library"
        description="Find the perfect business plan template. Get a personalized recommendation or browse our library."
      />

      <Card>
        <CardHeader>
          <CardTitle>Get an AI Recommendation</CardTitle>
          <CardDescription>Tell us about your business, and we'll suggest a template.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <FormControl><Input placeholder="e.g., SaaS, Restaurant" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl><Input placeholder="e.g., Technology, Hospitality" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Model</FormLabel>
                      <FormControl><Input placeholder="e.g., Subscription, B2B" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col">
                      <FormLabel>Company Description</FormLabel>
                      <FormControl><Textarea placeholder="Describe your company and its goals..." {...field} className="flex-grow" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Button type="submit" disabled={isLoading}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isLoading ? 'Thinking...' : 'Suggest Template'}
              </Button>
              {isLoading && (
                <div className="w-full space-y-2">
                    <Skeleton className="h-6 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
              )}
              {suggestion && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg w-full">
                  <h4 className="font-bold font-headline text-lg text-primary flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5"/>
                    We suggest the "{suggestion.suggestedTemplate}" template.
                  </h4>
                  <p className="text-sm text-foreground/80 mt-1">{suggestion.reason}</p>
                </div>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Template Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
