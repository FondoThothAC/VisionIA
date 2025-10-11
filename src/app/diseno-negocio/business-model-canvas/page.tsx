
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Maximize, History, Redo, Undo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PageHeader from "@/components/page-header";

const canvasDataSets = {
    "cafe-aroma": {
        keyPartners: "- Fincas de café de comercio justo en Chiapas y Veracruz.\n- Proveedores de empaques biodegradables.\n- Empresas de logística para distribución nacional.\n- Tiendas y mercados de productos orgánicos.",
        keyActivities: "- Tostado y molido artesanal del café.\n- Control de calidad riguroso.\n- Empaquetado y distribución.\n- Marketing digital y gestión de redes sociales.\n- Participación en ferias de café.",
        keyResources: "- Planta de tostado y equipo especializado.\n- Maestros tostadores con experiencia.\n- Granos de café verde de alta calidad.\n- Plataforma de e-commerce.\n- Marca y branding establecidos.",
        valueProposition: "Café de especialidad 100% mexicano, tostado artesanalmente para resaltar sus notas únicas. Ofrecemos un producto fresco, de origen ético y con un empaque amigable con el medio ambiente, entregado directamente a tu puerta o negocio.",
        customerRelationships: "- Soporte al cliente vía chat y correo electrónico.\n- Programa de lealtad y suscripciones mensuales.\n- Contenido educativo sobre café en blog y redes sociales.\n- Talleres de catación y barismo (futuro).",
        channels: "- Tienda en línea (e-commerce) propia.\n- Venta a cafeterías de especialidad (B2B).\n- Presencia en tiendas gourmet y mercados orgánicos.\n- Redes sociales (Instagram, Facebook) para marketing y ventas.",
        customerSegments: "- Consumidores finales (B2C) amantes del buen café, dispuestos a pagar por calidad y origen.\n- Cafeterías de especialidad y restaurantes (B2B) que buscan un proveedor de café premium.\n- Oficinas y corporativos que ofrecen café de calidad a sus empleados.",
        costStructure: "- Compra de grano de café verde (costo variable).\n- Salarios (maestros tostadores, equipo de empaque, marketing).\n- Renta de la bodega/planta de tostado.\n- Costos de empaque y logística.\n- Marketing y publicidad.\n- Mantenimiento de equipo.",
        revenueStreams: "- Venta directa al consumidor (B2C) a través de la tienda en línea.\n- Venta al por mayor (B2B) a cafeterías y tiendas.\n- Modelo de suscripción con envíos recurrentes.\n- Venta de merchandising y equipo para preparar café."
    },
    "restaurante-gambusinos": {
        keyPartners: "- Proveedores locales de carne y verduras de la región del Río Sonora.\n- Cervecerías artesanales locales.\n- Músicos y artistas locales para eventos.\n- Hoteles cercanos para promoción cruzada.",
        keyActivities: "- Preparación de alimentos y bebidas.\n- Servicio al cliente en restaurant y bar.\n- Organización de eventos (música en vivo, transmisión de deportes).\n- Marketing en redes sociales y local.",
        keyResources: "- Local con dos niveles (restaurante y bar).\n- Cocina y barra equipadas.\n- Recetas de cocina regional.\n- Personal (cocineros, meseros, barman).",
        valueProposition: "La auténtica experiencia gastronómica y social del Río Sonora: platillos regionales populares en un ambiente familiar durante el día, y un bar animado con temática minera por la noche.",
        customerRelationships: "- Trato amable y personalizado.\n- Programa de lealtad para clientes locales.\n- Interacción constante en redes sociales.",
        channels: "- Local físico en el centro de Aconchi.\n- Anuncios en la carretera y señalización local.\n- Página de Facebook e Instagram.\n- Recomendaciones de boca en boca.",
        customerSegments: "- Habitantes de Aconchi y comunidades aledañas.\n- Turistas que visitan las aguas termales y la Ruta del Río Sonora.\n- Trabajadores de la industria minera con poder adquisitivo.",
        costStructure: "- Renta del local.\n- Compra de insumos (alimentos y bebidas).\n- Salarios del personal.\n- Costos de servicios (luz, agua, gas).\n- Marketing y permisos.",
        revenueStreams: "- Venta de alimentos a la carta y buffet.\n- Venta de bebidas alcohólicas y no alcohólicas en restaurante y bar.\n- Cover para eventos especiales en el bar."
    },
    "ecoturismo-la-salina": {
        keyPartners: "- Instituciones gubernamentales (CONANP, CONAFOR).\n- Universidades y centros de investigación (UNISON, U of A).\n- Agencias de viajes especializadas en ecoturismo.\n- Comunidades locales (Pápagos).",
        keyActivities: "- Diseño y operación de recorridos ecoturísticos guiados.\n- Mantenimiento de senderos e instalaciones.\n- Programas de educación ambiental.\n- Marketing y alianzas comerciales.",
        keyResources: "- Terreno ejidal con atractivos naturales únicos (salina, desierto, mar).\n- Conocimiento profundo del área por parte de los guías locales (ejidatarios).\n- Instalaciones rústicas (cuarterías rehabilitadas).\n- Equipo para tours (bicicletas, kayaks).",
        valueProposition: "Una experiencia de inmersión auténtica en la conjunción única del desierto de Sonora y el Mar de Cortés, guiada por los protectores ancestrales del territorio.",
        customerRelationships: "- Relación directa y educativa durante los tours.\n- Seguimiento post-visita con información de conservación.\n- Creación de una comunidad de 'Amigos de La Salina'.",
        channels: "- Alianzas con agencias de viajes y universidades.\n- Marketing digital enfocado a nichos (observadores de aves, astrónomos amateurs).\n- Presencia en ferias de turismo de aventura y ecoturismo.",
        customerSegments: "- Ecoturistas y amantes de la naturaleza (principalmente de Arizona).\n- Estudiantes y académicos de biología, geología y antropología.\n- Fotógrafos de paisaje y naturaleza.\n- Grupos en busca de retiros y desconexión.",
        costStructure: "- Mantenimiento de instalaciones y equipo.\n- Salarios de guías y personal operativo.\n- Costos de permisos y cumplimiento de normativas ambientales.\n- Inversión en marketing y comercialización.",
        revenueStreams: "- Venta de paquetes de recorridos ecoturísticos.\n- Cobro por hospedaje en las instalaciones.\n- Renta de equipo (bicicletas, kayaks).\n- Venta de artesanías locales y productos regionales."
    }
};

type CanvasData = typeof canvasDataSets['cafe-aroma'];
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
  const [selectedProject, setSelectedProject] = useState("cafe-aroma");
  const [canvasData, setCanvasData] = useState<CanvasData>(canvasDataSets[selectedProject]);

  const handleProjectChange = (projectId: string) => {
      setSelectedProject(projectId);
      setCanvasData(canvasDataSets[projectId as keyof typeof canvasDataSets]);
  };

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
