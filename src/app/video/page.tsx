
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

const defaultScript = `"Buenos días a todos. Mi nombre es [Tu Nombre] y hoy quiero hablarles sobre el futuro de la planificación de negocios. Presentamos VisionIA: una plataforma diseñada para llevar una idea desde su concepción hasta la inversión, utilizando el poder de la inteligencia artificial. VisionIA no es solo una herramienta, es el copiloto estratégico que empodera a la nueva generación de emprendedores."

(Pausa para la siguiente diapositiva: El Gran Problema del Emprendimiento)

"Todos sabemos que las grandes ideas no son suficientes. Las estadísticas son contundentes: 8 de cada 10 startups fracasan. ¿Por qué? La causa principal no es la falta de pasión, sino una deficiente planificación estratégica y financiera. El 82% fracasa por problemas de flujo de efectivo, y casi la mitad falla porque nunca identificó una necesidad real en el mercado. Los emprendedores, incluso los más brillantes, están navegando a ciegas."

(Pausa para la siguiente diapositiva: La "Solución" Tradicional y sus Fallas)

"Hasta ahora, las herramientas que hemos tenido están rotas y son ineficientes. Las plantillas de Word son pasivas, las hojas de cálculo son complejas y propensas a errores, y los consultores externos son costosos y a menudo crean un plan para el emprendedor, no con él, perdiendo todo el aprendizaje en el proceso. El resultado es un plan que se guarda en un cajón."

(Pausa para la siguiente diapositiva: Nuestra Solución - VisionIA)

"Por eso creamos VisionIA, una plataforma que integra todos los aspectos de la creación de un negocio en un único entorno guiado por IA. Transformamos un proceso que antes era intimidante en una ventaja competitiva."`;


export default function VideoPage() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      script: defaultScript,
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setVideoUrl(null);
    try {
      toast({
        title: 'Generando Video Pitch...',
        description: 'La IA está creando tu video de presentación. Este proceso puede tardar varios minutos. Por favor, no cierres esta ventana.',
      });
      
      // const result = await generateVideoSummary(values.script);
      // setVideoUrl(result.videoUrl);

      // Placeholder
      await new Promise(resolve => setTimeout(resolve, 5000));
      // setVideoUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");


      toast({
        title: '¡Video Generado!',
        description: 'Tu video pitch está listo.',
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
        title="Generación de Pitch de Inversor"
        description="Utiliza esta sección para escribir y perfeccionar tu guion de presentación. Cuando estés listo, genera un video pitch dinámico con IA."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Guion para el Video Pitch</CardTitle>
                <CardDescription>Escribe o pega el texto que servirá como base para la narración y las escenas del video. Usa el texto de ejemplo como inspiración.</CardDescription>
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
                      Generar Video Pitch
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Tu Video Pitch</CardTitle>
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
