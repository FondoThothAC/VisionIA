
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Maximize, History, Redo, Undo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/page-header";

const initialData = {
    keyPartners: "- Fincas de café de comercio justo en Chiapas y Veracruz.\n- Proveedores de empaques biodegradables.\n- Empresas de logística para distribución nacional.\n- Tiendas y mercados de productos orgánicos.",
    keyActivities: "- Tostado y molido artesanal del café.\n- Control de calidad riguroso.\n- Empaquetado y distribución.\n- Marketing digital y gestión de redes sociales.\n- Participación en ferias de café.",
    keyResources: "- Planta de tostado y equipo especializado.\n- Maestros tostadores con experiencia.\n- Granos de café verde de alta calidad.\n- Plataforma de e-commerce.\n- Marca y branding establecidos.",
    valueProposition: "Café de especialidad 100% mexicano, tostado artesanalmente para resaltar sus notas únicas. Ofrecemos un producto fresco, de origen ético y con un empaque amigable con el medio ambiente, entregado directamente a tu puerta o negocio.",
    customerRelationships: "- Soporte al cliente vía chat y correo electrónico.\n- Programa de lealtad y suscripciones mensuales.\n- Contenido educativo sobre café en blog y redes sociales.\n- Talleres de catación y barismo (futuro).",
    channels: "- Tienda en línea (e-commerce) propia.\n- Venta a cafeterías de especialidad (B2B).\n- Presencia en tiendas gourmet y mercados orgánicos.\n- Redes sociales (Instagram, Facebook) para marketing y ventas.",
    customerSegments: "- Consumidores finales (B2C) amantes del buen café, dispuestos a pagar por calidad y origen.\n- Cafeterías de especialidad y restaurantes (B2B) que buscan un proveedor de café premium.\n- Oficinas y corporativos que ofrecen café de calidad a sus empleados.",
    costStructure: "- Compra de grano de café verde (costo variable).\n- Salarios (maestros tostadores, equipo de empaque, marketing).\n- Renta de la bodega/planta de tostado.\n- Costos de empaque y logística.\n- Marketing y publicidad.\n- Mantenimiento de equipo.",
    revenueStreams: "- Venta directa al consumidor (B2C) a través de la tienda en línea.\n- Venta al por mayor (B2B) a cafeterías y tiendas.\n- Modelo de suscripción con envíos recurrentes.\n- Venta de merchandising y equipo para preparar café."
};

type CanvasData = typeof initialData;
type CanvasKey = keyof CanvasData;

const CanvasBlock = ({ title, content, onContentChange, blockKey, className }: { title: string, content: string, onContentChange: (key: CanvasKey, value: string) => void, blockKey: CanvasKey, className?: string }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Card className={`cursor-pointer hover:shadow-lg transition-shadow relative group ${className}`}>
        <CardHeader className="p-3">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <Textarea 
            value={content}
            onChange={(e) => onContentChange(blockKey, e.target.value)}
            className="h-full resize-none bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            readOnly
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[600px] h-[70vh] flex flex-col">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <div className="flex-grow">
        <Textarea 
          value={content}
          onChange={(e) => onContentChange(blockKey, e.target.value)}
          className="h-full resize-none"
          placeholder={`Escribe aquí sobre "${title}"...`}
        />
      </div>
    </DialogContent>
  </Dialog>
);


export default function BusinessModelCanvasPage() {
  const [canvasData, setCanvasData] = useState<CanvasData>(initialData);

  const handleContentChange = (key: CanvasKey, value: string) => {
    setCanvasData(prevData => ({
      ...prevData,
      [key]: value
    }));
  };

  const handleSave = () => {
    console.log("Guardando datos del lienzo:", canvasData);
    alert("Progreso guardado en la consola del navegador.");
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row items-start justify-between gap-4">
         <div className="flex-grow">
             <PageHeader
                title="Lienzo del Modelo de Negocio"
                description="Rellena los 9 bloques para construir tu modelo de negocio."
                projectSelector={
                   <Select defaultValue="cafe-aroma">
                      <SelectTrigger className="w-auto border-none shadow-none text-xl font-bold p-0 focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cafe-aroma">Proyecto: Café 'Aroma de Montaña'</SelectItem>
                        <SelectItem value="app-fitness">Proyecto: App de Fitness</SelectItem>
                      </SelectContent>
                    </Select>
                }
                author="Roberto"
                aiModel="Phi 4 Mini"
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

      <div className="grid grid-cols-5 grid-rows-8 gap-4 min-h-[75vh]">
        <CanvasBlock title="8. Socios Clave" blockKey="keyPartners" content={canvasData.keyPartners} onContentChange={handleContentChange} className="col-span-1 row-span-4" />
        
        <div className="col-span-1 row-span-4 flex flex-col gap-4">
            <CanvasBlock title="7. Actividades Clave" blockKey="keyActivities" content={canvasData.keyActivities} onContentChange={handleContentChange} className="flex-1" />
            <CanvasBlock title="6. Recursos Clave" blockKey="keyResources" content={canvasData.keyResources} onContentChange={handleContentChange} className="flex-1" />
        </div>
        
        <CanvasBlock title="2. Propuestas de Valor" blockKey="valueProposition" content={canvasData.valueProposition} onContentChange={handleContentChange} className="col-span-1 row-span-4" />

        <div className="col-span-1 row-span-4 flex flex-col gap-4">
            <CanvasBlock title="4. Relación con Clientes" blockKey="customerRelationships" content={canvasData.customerRelationships} onContentChange={handleContentChange} className="flex-1" />
            <CanvasBlock title="3. Canales" blockKey="channels" content={canvasData.channels} onContentChange={handleContentChange} className="flex-1" />
        </div>

        <CanvasBlock title="1. Segmentos de Mercado" blockKey="customerSegments" content={canvasData.customerSegments} onContentChange={handleContentChange} className="col-span-1 row-span-4" />
        
        <CanvasBlock title="9. Estructura de Costes" blockKey="costStructure" content={canvasData.costStructure} onContentChange={handleContentChange} className="col-span-2 row-span-4 col-start-1" />
        
        <CanvasBlock title="5. Fuentes de Ingresos" blockKey="revenueStreams" content={canvasData.revenueStreams} onContentChange={handleContentChange} className="col-span-3 row-span-4 col-start-3" />
      </div>
    </div>
  );
}

    
