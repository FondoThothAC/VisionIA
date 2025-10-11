
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, History, Redo, Undo } from "lucide-react";
import PageHeader from "@/components/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialData = {
    problema: "- Los emprendedores luchan por crear planes de negocio sólidos.\n- Las herramientas existentes (Word, Excel) son ineficientes y no están conectadas.\n- El acceso a consultoría de calidad es caro y no escalable.",
    segmentosDeClientes: "- Fundadores de startups en etapa temprana.\n- Pequeños empresarios buscando financiación.\n- Estudiantes de negocios y emprendimiento.",
    propuestaUnicaDeValor: "Tu copiloto de IA para la planificación de negocios: una plataforma que te guía desde la idea hasta el plan de inversión.",
    solucion: "- Lienzos interactivos guiados por IA.\n- Generación automática de proyecciones financieras.\n- Análisis de mercado con datos reales.",
    canales: "- Marketing de contenidos (blog, SEO).\n- Redes sociales (LinkedIn, Twitter).\n- Alianzas con universidades y aceleradoras.",
    flujosDeIngresos: "- Modelo Freemium: Lienzos básicos gratis, funciones avanzadas con suscripción Pro.\n- Suscripción para equipos y consultores.",
    estructuraDeCostos: "- Costos de API de IA (OpenAI/Google).\n- Hosting y servidores.\n- Salarios del equipo de desarrollo y marketing.",
    metricasClave: "- Número de usuarios activos mensuales (MAU).\n- Tasa de conversión de gratuito a Pro.\n- Tasa de Churn.",
    ventajaInjusta: "- Algoritmo propietario para análisis financiero y de riesgos.\n- Integración única de múltiples APIs de datos (INEGI, etc.).\n- Equipo fundador con experiencia en IA y finanzas."
};

type CanvasData = typeof initialData;
type CanvasKey = keyof CanvasData;

const CanvasBlock = ({ title, content, onContentChange, blockKey, className, number }: { title: string, content: string, onContentChange: (key: CanvasKey, value: string) => void, blockKey: CanvasKey, className?: string, number: number }) => (
  <Card className={`flex flex-col ${className}`}>
    <CardHeader className="p-3">
      <CardTitle className="text-base font-medium">{number}. {title}</CardTitle>
    </CardHeader>
    <CardContent className="p-3 pt-0 flex-grow">
      <Textarea 
        value={content}
        onChange={(e) => onContentChange(blockKey, e.target.value)}
        className="h-full resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder={`Describe "${title}"...`}
      />
    </CardContent>
  </Card>
);

export default function LeanCanvasPage() {
  const [selectedProject, setSelectedProject] = useState("cafe-aroma");
  const [canvasData, setCanvasData] = useState<CanvasData>(initialData);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    // Data would be loaded based on projectId
    setCanvasData(initialData);
  };

  const handleContentChange = (key: CanvasKey, value: string) => {
    setCanvasData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Guardando datos del Lean Canvas:", canvasData);
    alert("Progreso guardado en la consola.");
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row items-start justify-between gap-4">
         <div className="flex-grow">
             <PageHeader
                title="Lean Canvas"
                description="Un plan de negocio de 1 página enfocado en problemas, soluciones y métricas clave."
                projectSelector={
                   <Select value={selectedProject} onValueChange={handleProjectChange}>
                      <SelectTrigger className="w-auto border-none shadow-none text-xl font-bold p-0 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cafe-aroma">Proyecto: Café 'Aroma de Montaña'</SelectItem>
                        <SelectItem value="restaurante-gambusinos">Proyecto: Restaurant-Bar "Gambusinos"</SelectItem>
                                <SelectItem value="ecoturismo-la-salina">Proyecto: Campo Ecoturístico La Salina</SelectItem>
                      </SelectContent>
                    </Select>
                }
                author="Roberto"
                aiModel={
                    <Select defaultValue="phi-4-mini">
                        <SelectTrigger className="w-auto border-none shadow-none focus:ring-0">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="phi-4-mini">Phi 4 Mini</SelectItem>
                            <SelectItem value="llama-3">Llama 3</SelectItem>
                            <SelectItem value="gemini-1.5">Gemini 1.5</SelectItem>
                        </SelectContent>
                    </Select>
                }
            />
        </div>
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Undo/></Button>
            <Button variant="ghost" size="icon"><Redo/></Button>
            <Button variant="outline"><History className="mr-2"/> Historial</Button>
            <Button onClick={handleSave}>
                <Save className="mr-2"/>
                Guardar Progreso
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 min-h-[75vh]">
        <CanvasBlock title="Problema" blockKey="problema" content={canvasData.problema} onContentChange={handleContentChange} className="lg:col-span-2" number={1}/>
        <CanvasBlock title="Solución" blockKey="solucion" content={canvasData.solucion} onContentChange={handleContentChange} number={4}/>
        <CanvasBlock title="Métricas Clave" blockKey="metricasClave" content={canvasData.metricasClave} onContentChange={handleContentChange} number={8}/>
        <CanvasBlock title="Propuesta Única de Valor" blockKey="propuestaUnicaDeValor" content={canvasData.propuestaUnicaDeValor} onContentChange={handleContentChange} className="lg:row-span-2" number={3}/>
        <CanvasBlock title="Ventaja Injusta" blockKey="ventajaInjusta" content={canvasData.ventajaInjusta} onContentChange={handleContentChange} number={9}/>
        <CanvasBlock title="Canales" blockKey="canales" content={canvasData.canales} onContentChange={handleContentChange} number={5}/>
        <CanvasBlock title="Segmentos de Clientes" blockKey="segmentosDeClientes" content={canvasData.segmentosDeClientes} onContentChange={handleContentChange} className="lg:col-span-2" number={2}/>
        
        <div className="lg:col-span-3 lg:col-start-1">
          <CanvasBlock title="Estructura de Costos" blockKey="estructuraDeCostos" content={canvasData.estructuraDeCostos} onContentChange={handleContentChange} number={7}/>
        </div>
        <div className="lg:col-span-2">
          <CanvasBlock title="Flujos de Ingresos" blockKey="flujosDeIngresos" content={canvasData.flujosDeIngresos} onContentChange={handleContentChange} number={6}/>
        </div>
      </div>
    </div>
  );
}
