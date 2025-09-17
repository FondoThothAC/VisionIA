"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2 } from 'lucide-react';
import { generateBusinessPlanOutline } from '@/ai/flows/generate-business-plan-outline';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/page-header';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  businessIdea: z.string().min(10, 'Please provide a more detailed business idea.'),
  targetMarket: z.string().min(10, 'Please describe your target market in more detail.'),
  competitiveAdvantages: z.string().min(10, 'Please list at least one competitive advantage.'),
  revenueModel: z.string().min(10, 'Please explain your revenue model.'),
});

type FormData = z.infer<typeof formSchema>;

export default function OutlinePage() {
  const [outline, setOutline] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessIdea: '',
      targetMarket: '',
      competitiveAdvantages: '',
      revenueModel: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setOutline(null);
    try {
      toast({
        title: 'Generating Outline...',
        description: 'The AI is crafting your business plan. Please wait.',
      });
      const result = await generateBusinessPlanOutline(values);
      setOutline(result.outline);
      toast({
        title: 'Outline Generated!',
        description: 'Your business plan outline is ready.',
      });
    } catch (error) {
      console.error('Error generating outline:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate outline. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Business Plan Outline Generator"
        description="Fill in the details below, and our AI will generate a comprehensive business plan outline for you."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Provide the core concepts of your business.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Idea</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., A subscription box service for eco-friendly products..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="targetMarket"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Market</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Environmentally conscious millennials in urban areas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="competitiveAdvantages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Competitive Advantages</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Exclusive partnerships with local artisans, unique packaging" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="revenueModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Revenue Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Monthly/annual subscriptions, one-off purchases" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isLoading ? 'Generating...' : 'Generate Outline'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Outline</CardTitle>
            <CardDescription>Your AI-generated business plan outline will appear here.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="pl-4 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                 <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                 <div className="pl-4 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {outline && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-body text-sm bg-muted/50 p-4 rounded-lg">{outline}</pre>
              </div>
            )}
            {!isLoading && !outline && (
                <div className="flex items-center justify-center h-64 text-center text-muted-foreground">
                    <p>Your outline is waiting to be created.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
