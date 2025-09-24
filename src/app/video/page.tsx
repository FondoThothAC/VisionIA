
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

const defaultScript = `
"Buenos días a todos. Mi nombre es [Tu Nombre] y hoy quiero hablarles sobre el futuro de la planificación de negocios. Presentamos VisionIA: una plataforma diseñada para llevar una idea desde su concepción hasta la inversión, utilizando el poder de la inteligencia artificial. VisionIA no es solo una herramienta, es el copiloto estratégico que empodera a la nueva generación de emprendedores."

(Al mostrar Diapositiva 2: El Gran Problema del Emprendimiento)
"Todos sabemos que las grandes ideas no son suficientes. Las estadísticas son contundentes: 8 de cada 10 startups fracasan en sus primeros dos años. Pero, ¿por qué? La causa principal no es la falta de pasión, ni siquiera un mal producto. Es una deficiente planificación estratégica y financiera.

El 82% fracasa por problemas de flujo de efectivo. El 78% se queda sin capital simplemente por no tener un plan financiero realista. Y casi la mitad, el 42%, falla porque nunca identificó una necesidad real en el mercado. En esencia, los emprendedores, incluso los más brillantes, están navegando a ciegas."

(Al mostrar Diapositiva 3: La "Solución" Tradicional y sus Fallas)
"Hasta ahora, las herramientas que hemos tenido para intentar resolver esto están rotas, desconectadas y son terriblemente ineficientes.

Por un lado, tenemos las plantillas estáticas de Word o PDF. Son documentos pasivos, no ofrecen guía, no calculan nada y se vuelven obsoletos en el momento en que los guardas.

Luego están las hojas de cálculo. Son potentes, pero increíblemente complejas, muy propensas a errores de fórmula y carecen de la estructura narrativa que se necesita para contar una historia convincente.

Y por último, están los consultores externos. Son una opción, pero extremadamente costosos y, lo que es más importante, a menudo crean un plan para el emprendedor, no con él. Se pierde todo el aprendizaje clave en el proceso.

El resultado final de todo esto es un plan de negocios que se guarda en un cajón y nunca se utiliza como la herramienta viva que debería ser."

(Al mostrar Diapositiva 4: Nuestra Solución - VisionIA)
"Por eso creamos VisionIA. Presentamos una plataforma de planificación estratégica que funciona como un copiloto inteligente para cada fundador.

VisionIA integra todos los aspectos de la creación de un negocio en un único entorno guiado por inteligencia artificial. Transformamos un proceso que antes era intimidante en una ventaja competitiva clara. Con VisionIA, dejamos de escribir documentos estáticos para empezar a construir estrategias dinámicas."

[Imagen de el panel de control de la aplicación VisionIA]

(Al mostrar Diapositiva 5: ¿Cómo Funciona? - Base Estratégica)
"¿Cómo lo hacemos? Primero, construimos la estrategia desde los cimientos, combinando las metodologías más probadas del mundo.

Comenzamos con un análisis de mercado profundo. La plataforma integra lienzos interactivos para realizar un análisis FODA completo, un estudio detallado de la competencia y, fundamentalmente, la definición del Cliente Ideal o Buyer Persona.

Además, adoptamos un enfoque Lean Startup, validando la idea de negocio con las mismas guías que usan aceleradoras como Y Combinator. Nos enfocamos en definir claramente el problema, el Producto Mínimo Viable y, sobre todo, la tracción inicial que demuestra que el mercado responde.

Finalmente, ayudamos a estructurar una estrategia de marketing y ventas sólida, guiando al usuario para definir su propuesta de valor, sus canales de adquisición y su política de precios."

(Al mostrar Diapositiva 6: ¿Cómo Funciona? - Motor Financiero)
"Una vez que la estrategia está clara, VisionIA la traduce en números sólidos y defendibles, listos para ser presentados a cualquier inversor.

Nuestro motor financiero genera proyecciones a 5 años, creando automáticamente los tres estados financieros clave: el Estado de Resultados, el Balance General y el Flujo de Efectivo.

Vamos un paso más allá en el realismo: calculamos los costos de personal reales, incluyendo la carga social completa del IMSS, INFONAVIT e Impuesto Sobre Nómina, evitando las sorpresas que suelen hundir a las startups.

Y, por supuesto, monitorizamos y explicamos los KPIs y métricas más importantes para un negocio en crecimiento, desde el Costo de Adquisición de Cliente hasta el Valor de Vida del Cliente. Todo esto, estructurado en un catálogo de cuentas interactivo que sigue las Normas de Información Financiera de México."

(Al mostrar Diapositiva 7: Nuestra Ventaja Injusta: La IA Aplicada)
"Pero lo que realmente nos diferencia, nuestra ventaja injusta, es cómo usamos la inteligencia artificial para ir más allá de la simple recolección de datos.

Primero, con la optimización de recursos. Usando programación lineal, nuestra IA puede analizar las restricciones de producción de un negocio —como tiempo, materiales o capital— y recomendar la combinación exacta de productos o servicios que maximizará la ganancia. Con esto, pasamos de la intuición a la optimización matemática.

Segundo, con el análisis multimodal. VisionIA no solo entiende texto. Puede analizar imágenes, documentos y videos subidos por el usuario para extraer insights valiosos que enriquecen el análisis de mercado y validan las fortalezas del negocio de una forma que antes no era posible."

(Al mostrar Diapositiva 8: La Visión a Futuro)
"Y esto es solo el comienzo. VisionIA está evolucionando para convertirse en un verdadero consultor proactivo.

Nuestra IA pasará de ser una herramienta pasiva a un asistente activo, ofreciendo recomendaciones personalizadas y alertando sobre posibles riesgos.

Con un solo clic, VisionIA generará entregables de grado de inversión: no solo el plan de negocios, sino también presentaciones de pitch y resúmenes ejecutivos con un diseño profesional.

El panel principal se convertirá en un 'Dashboard de Salud del Negocio', monitorizando en tiempo real el progreso y las métricas clave. Y finalmente, nos integraremos con el ecosistema, conectándonos a fuentes de datos de mercado en vivo y a plataformas de financiamiento para cerrar el ciclo desde la planificación hasta la ejecución."

(Al mostrar Diapositiva 9: Nuestro Impacto en el Ecosistema)
"Nuestra misión es ambiciosa: queremos democratizar el éxito emprendedor.

Para los fundadores, damos acceso a un nivel de planificación estratégica que antes era inalcanzable, permitiéndoles tomar decisiones más inteligentes y aumentar drásticamente sus probabilidades de éxito.

Para incubadoras y aceleradoras, proveemos una herramienta estandarizada para guiar y monitorizar a sus startups.

Y para los inversores, generamos planes de negocio consistentes, bien fundamentados y fáciles"
`;


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
