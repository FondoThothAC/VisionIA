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
  conceptDescription: z.string().min(10, 'Por favor, proporciona una descripción más detallada para la imagen.'),
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
        title: 'Generando Imagen...',
        description: 'La IA está creando tu visual. Esto puede tomar un momento.',
      });
      const result = await generateImagesForBusinessConcepts(values);
      setImageUrl(result.imageUrl);
      toast({
        title: '¡Imagen Generada!',
        description: 'Tu concepto visual está listo.',
      });
    } catch (error) {
      console.error('Error generando imagen:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo generar la imagen. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Generador de Visuales"
        description="Crea imágenes, mapas mentales y diagramas a partir de texto. Describe tu concepto y nuestra IA le dará vida, incluyendo el logo de CAFES UNISON."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Describe tu Concepto</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <FormField
                  control={form.control}
                  name="conceptDescription"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col">
                      <FormLabel>Descripción de la Imagen</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej: Un mapa mental que muestra las conexiones entre marketing, ventas y soporte al cliente con un centro para nuestro CRM..."
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
                  {isLoading ? 'Generando...' : 'Generar Imagen'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Visual Generado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
              {isLoading && <Skeleton className="w-full h-full" />}
              {!isLoading && imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Concepto de negocio generado"
                  width={600}
                  height={400}
                  className="rounded-md object-contain"
                />
              )}
              {!isLoading && !imageUrl && (
                <div className="text-center text-muted-foreground p-4">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>Tu imagen generada aparecerá aquí.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
