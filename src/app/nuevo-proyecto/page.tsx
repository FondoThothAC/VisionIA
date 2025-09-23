
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowRight, Lightbulb, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { suggestBusinessPlanTemplate, SuggestBusinessPlanTemplateOutput } from '@/ai/flows/suggest-business-plan-template';

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
  businessType: z.string().min(3, 'Por favor, especifica el tipo de negocio.'),
  industry: z.string().min(3, 'Por favor, especifica la industria.'),
  businessModel: z.string().min(3, 'Por favor, describe el modelo de negocio.'),
  companyDescription: z.string().min(20, 'Por favor, proporciona una descripción más detallada.'),
});

type FormData = z.infer<typeof formSchema>;

export default function NewProjectPage() {
  const [suggestion, setSuggestion] = useState<SuggestBusinessPlanTemplateOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessType: 'Tech Startup',
      industry: 'Software as a Service (SaaS)',
      businessModel: 'Suscripción mensual',
      companyDescription: 'Una plataforma de IA que ayuda a los emprendedores a crear planes de negocio sólidos y a obtener financiación. La herramienta guía a los usuarios a través de cada sección del plan, ofreciendo sugerencias generadas por IA, proyecciones financieras y análisis de mercado.',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setSuggestion(null);
    try {
      toast({
        title: 'Buscando la mejor plantilla...',
        description: 'La IA está analizando tu idea para sugerir una estructura.',
      });
      const result = await suggestBusinessPlanTemplate(values);
      setSuggestion(result);
      toast({
        title: '¡Sugerencia Lista!',
        description: 'Hemos encontrado una buena estructura para tu plan.',
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
        title="Crear Nuevo Proyecto"
        description="Comienza por definir los pilares de tu negocio. La IA usará esta información para sugerirte la mejor estructura para tu plan."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Describe tu Negocio</CardTitle>
                <CardDescription>Proporciona los conceptos centrales de tu futura empresa.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Negocio</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Restaurante, E-commerce, SaaS..." {...field} />
                      </FormControl>
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
                      <FormControl>
                        <Input placeholder="Ej: Tecnología, Alimentación, Moda..." {...field} />
                      </FormControl>
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
                      <FormControl>
                        <Input placeholder="Ej: Venta directa, Suscripción, Publicidad..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción Breve de la Empresa y sus Metas</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe la misión, visión y lo que quieres lograr..." {...field} rows={6} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Analizando...
                        </>
                    ) : (
                        <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Sugerir Estructura de Plan
                        </>
                    )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sugerencia de la IA</CardTitle>
            <CardDescription>Basado en tu descripción, te recomendamos la siguiente estructura para comenzar.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            )}
            {suggestion && (
              <div className="space-y-6">
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                    <h3 className="font-bold text-primary flex items-center gap-2">
                        <Sparkles className="h-5 w-5"/>
                        Plantilla Sugerida
                    </h3>
                    <p className="text-lg font-semibold">{suggestion.suggestedTemplate}</p>
                </div>
                <div className="p-4 bg-muted/50 border rounded-lg">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <Lightbulb className="h-5 w-5"/>
                        Razón
                    </h3>
                    <p className="text-muted-foreground mt-2">{suggestion.reason}</p>
                </div>
                 <div className="text-center pt-4">
                    <Button size="lg" disabled>
                        Siguiente: Generar Esquema Detallado
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">(Próximamente)</p>
                </div>
              </div>
            )}
            {!isLoading && !suggestion && (
                <div className="flex items-center justify-center h-64 text-center text-muted-foreground">
                    <p>La sugerencia de la IA aparecerá aquí.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
