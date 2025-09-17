
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lightbulb, Wand2, Download, BookOpen } from 'lucide-react';
import { suggestBusinessPlanTemplate } from '@/ai/flows/suggest-business-plan-template';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from '@/components/page-header';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import BusinessPlanGuide from '@/components/business-plan-guide';

const formSchema = z.object({
  businessType: z.string().min(3, 'Por favor, introduce un tipo de negocio válido.'),
  industry: z.string().min(3, 'Por favor, introduce una industria válida.'),
  businessModel: z.string().min(3, 'Por favor, describe tu modelo de negocio.'),
  companyDescription: z.string().min(10, 'Por favor, proporciona una breve descripción de la empresa.'),
});

type FormData = z.infer<typeof formSchema>;

const canvases = [
  { name: 'Mapa de Empatía', description: 'Para entender profundamente a tu cliente: qué piensa, siente, ve, oye, dice y hace.' },
  { name: 'Buyer Persona', description: 'Para crear un perfil semi-ficticio de tu cliente ideal basado en datos reales.' },
  { name: 'Mapa del Viaje del Cliente', description: 'Para visualizar todas las interacciones del cliente con tu empresa e identificar puntos de mejora.' },
  { name: 'Lienzo de la Propuesta de Valor', description: 'Para asegurar que tu producto o servicio resuelve problemas y crea alegrías reales para tus clientes.' },
  { name: 'Lienzo del Modelo de Negocio', description: 'Para describir, diseñar y visualizar tu modelo de negocio completo en una sola página.' },
  { name: 'Lean Canvas', description: 'Adaptación del Business Model Canvas para startups, enfocada en problema, solución, métricas y ventaja.' },
  { name: 'Product Canvas', description: 'Para definir la visión, objetivos, funcionalidades y métricas de un producto específico.' },
  { name: 'Análisis FODA', description: 'Para evaluar las Fortalezas, Oportunidades, Debilidades y Amenazas de tu negocio.' },
  { name: 'Lienzo de la Competencia', description: 'Para analizar y comparar de forma estructurada a tus competidores directos e indirectos.' },
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
        title: 'Buscando tu plantilla...',
        description: 'La IA está analizando las necesidades de tu negocio.',
      });
      const result = await suggestBusinessPlanTemplate(values);
      setSuggestion(result);
      toast({
        title: '¡Sugerencia Lista!',
        description: `Recomendamos la plantilla "${result.suggestedTemplate}".`,
      });
    } catch (error) {
      console.error('Error sugiriendo la plantilla:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo obtener una sugerencia. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Biblioteca de Plantillas y Lienzos"
        description="Encuentra la plantilla o lienzo estratégico perfecto para tu negocio. Obtén una recomendación o explora la galería."
      />

      <BusinessPlanGuide />

      <Card>
        <CardHeader>
          <CardTitle>Obtén una Recomendación de IA para tu Plan de Negocios</CardTitle>
          <CardDescription>Cuéntanos sobre tu negocio y te sugeriremos una plantilla de plan de negocios completa.</CardDescription>
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
                      <FormLabel>Tipo de Negocio</FormLabel>
                      <FormControl><Input placeholder="Ej: SaaS, Restaurante" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industria</FormLabel>
                      <FormControl><Input placeholder="Ej: Tecnología, Hostelería" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Modelo de Negocio</FormLabel>
                      <FormControl><Input placeholder="Ej: Suscripción, B2B" {...field} /></FormControl>
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
                      <FormLabel>Descripción de la Empresa</FormLabel>
                      <FormControl><Textarea placeholder="Describe tu empresa y sus objetivos..." {...field} className="flex-grow" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <Button type="submit" disabled={isLoading}>
                <Wand2 className="mr-2 h-4 w-4" />
                {isLoading ? 'Pensando...' : 'Sugerir Plantilla'}
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
                    Sugerimos la plantilla "{suggestion.suggestedTemplate}".
                  </h4>
                  <p className="text-sm text-foreground/80 mt-1">{suggestion.reason}</p>
                </div>
              )}
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold font-headline">Galería de Lienzos Estratégicos</h2>
        <p className="text-muted-foreground">Utiliza estas herramientas para analizar, diseñar y pivotar tu modelo de negocio.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {canvases.map((canvas) => (
            <Card key={canvas.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{canvas.name}</CardTitle>
                <CardDescription>{canvas.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
