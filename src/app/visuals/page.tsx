"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageIcon, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { generateImagesForBusinessConcepts } from '@/ai/flows/generate-images-for-business-concepts';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/page-header';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  conceptDescription: z.string().min(10, 'Please provide a more detailed description for the image.'),
});

type FormData = z.infer<typeof formSchema>;

export default function VisualsPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      conceptDescription: '',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setImageUrl(null);
    try {
      toast({
        title: 'Generating Image...',
        description: 'The AI is creating your visual. This may take a moment.',
      });
      const result = await generateImagesForBusinessConcepts(values);
      setImageUrl(result.imageUrl);
      toast({
        title: 'Image Generated!',
        description: 'Your visual concept is ready.',
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate image. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Visuals Generator"
        description="Create images, mindmaps, and diagrams from text. Describe your concept, and our AI will bring it to life, complete with the CAFES UNISON logo."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Describe Your Concept</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <FormField
                  control={form.control}
                  name="conceptDescription"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col">
                      <FormLabel>Image Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., A mindmap showing the connections between marketing, sales, and customer support with a central hub for our CRM..."
                          className="flex-grow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isLoading ? 'Generating...' : 'Generate Image'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated Visual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
              {isLoading && <Skeleton className="w-full h-full" />}
              {!isLoading && imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Generated business concept"
                  width={600}
                  height={400}
                  className="rounded-md object-contain"
                />
              )}
              {!isLoading && !imageUrl && (
                <div className="text-center text-muted-foreground p-4">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Your generated image will appear here.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
