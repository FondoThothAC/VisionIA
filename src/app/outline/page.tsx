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
  businessIdea: z.string().min(10, 'Por favor, proporciona una idea de negocio más detallada.'),
  targetMarket: z.string().min(10, 'Por favor, describe tu mercado objetivo con más detalle.'),
  competitiveAdvantages: z.string().min(10, 'Por favor, enumera al menos una ventaja competitiva.'),
  revenueModel: z.string().min(10, 'Por favor, explica tu modelo de ingresos.'),
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
        title: 'Generando Esquema...',
        description: 'La IA está creando tu plan de negocios. Por favor espera.',
      });
      const result = await generateBusinessPlanOutline(values);
      setOutline(result.outline);
      toast({
        title: '¡Esquema Generado!',
        description: 'El esquema de tu plan de negocios está listo.',
      });
    } catch (error) {
      console.error('Error generando el esquema:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo generar el esquema. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Generador de Esquemas de Plan de Negocios"
        description="Completa los detalles a continuación y nuestra IA generará un esquema completo de plan de negocios para ti."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Detalles del Negocio</CardTitle>
                <CardDescription>Proporciona los conceptos centrales de tu negocio.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessIdea"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idea de Negocio</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ej: Un servicio de caja de suscripción para productos ecológicos..." {...field} />
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
                      <FormLabel>Mercado Objetivo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Millennials con conciencia ambiental en áreas urbanas" {...field} />
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
                      <FormLabel>Ventajas Competitivas</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Asociaciones exclusivas con artesanos locales, empaques únicos" {...field} />
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
                      <FormLabel>Modelo de Ingresos</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Suscripciones mensuales/anuales, compras únicas" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  {isLoading ? 'Generando...' : 'Generar Esquema'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Esquema Generado</CardTitle>
            <CardDescription>El esquema de tu plan de negocios generado por IA aparecerá aquí.</CardDescription>
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
                    <p>Tu esquema está esperando ser creado.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
