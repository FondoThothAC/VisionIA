
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Film, Wand2, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import PageHeader from "@/components/page-header";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
// import { generateVideoSummary } from '@/ai/flows/generate-video-summary';

const formSchema = z.object({
  script: z.string().min(50, 'Por favor, proporciona un guion de al menos 50 caracteres.'),
});

type FormData = z.infer<typeof formSchema>;

export default function VideoPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      script: 'Ej: Emprendimientos Visionarios es tu copiloto de IA para la planificación de negocios. Transforma tus ideas en planes sólidos con nuestras herramientas inteligentes, desde la generación de esquemas hasta el análisis financiero y la creación de visuales impactantes. Comienza hoy y da vida a tu visión.',
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setVideoUrl(null);
    try {
      toast({
        title: 'Generando Video...',
        description: 'La IA está creando tu resumen en video. Este proceso puede tardar varios minutos. Por favor, no cierres esta ventana.',
      });
      
      // const result = await generateVideoSummary(values.script);
      // setVideoUrl(result.videoUrl);

      // Placeholder
      await new Promise(resolve => setTimeout(resolve, 5000));
      // setVideoUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");


      toast({
        title: '¡Video Generado!',
        description: 'Tu resumen en video está listo.',
      });
    } catch (error) {
      console.error('Error generando el video:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo generar el video. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Generación de Resumen en Video"
        description="Crea automáticamente un atractivo resumen en video de tu plan de negocios. Perfecto para presentaciones a inversores y marketing."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Guion para el Video</CardTitle>
                <CardDescription>Escribe o pega el texto que servirá como base para la narración y las escenas del video.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <FormField
                  control={form.control}
                  name="script"
                  render={({ field }) => (
                    <FormItem className="h-full flex flex-col">
                      <FormLabel>Contenido del Guion</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ej: Emprendimientos Visionarios es tu copiloto de IA para la planificación de negocios..."
                          className="flex-grow min-h-[200px]"
                          {...field}
                        />
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
                      Generando... (esto puede tardar)
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" />
                      Generar Video
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Tu Resumen en Video</CardTitle>
                <CardDescription>El video generado aparecerá aquí cuando esté listo.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
                {isLoading && (
                    <div className="flex flex-col items-center text-center text-muted-foreground">
                        <Loader2 className="h-12 w-12 animate-spin mb-4" />
                        <p className="font-semibold">Procesando video...</p>
                        <p className="text-sm">Este proceso puede tomar varios minutos.</p>
                    </div>
                )}
                {!isLoading && videoUrl && (
                    <video controls src={videoUrl} className="w-full h-full rounded-lg">
                        Tu navegador no soporta el tag de video.
                    </video>
                )}
                {!isLoading && !videoUrl && (
                    <div className="text-center text-muted-foreground p-4">
                    <Film className="h-12 w-12 mx-auto mb-2" />
                    <p>Tu video está esperando ser creado.</p>
                    </div>
                )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
