
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
    },
    "taller-carroceria": {
      keyPartners: "- Aseguradoras de autos.\n- Proveedores de pintura y materiales (Axalta, 3M).\n- Talleres mecánicos para referidos.\n- Flotillas de empresas locales.",
      keyActivities: "- Reparación de colisiones (chapa).\n- Aplicación de pintura y acabados.\n- Pulido y detallado automotriz.\n- Gestión de presupuestos y atención al cliente.",
      keyResources: "- Taller equipado (compresora, pistolas, herramientas).\n- Personal técnico calificado.\n- Cabina de pintura (futura adquisición).\n- Relación con proveedores.",
      valueProposition: "Servicio rápido, económico y de calidad en carrocería y pintura, con atención personalizada y seguimiento post-servicio para garantizar la satisfacción total del cliente.",
      customerRelationships: "- Atención directa y personalizada.\n- Seguimiento post-servicio para control de calidad.\n- Garantía sobre el trabajo realizado.",
      channels: "- Publicidad local (volantes, periódicos).\n- Redes sociales (Facebook, Instagram) para mostrar trabajos.\n- Referidos de clientes satisfechos.\n- Convenios con empresas y aseguradoras.",
      customerSegments: "- Propietarios de vehículos particulares que han sufrido un accidente menor.\n- Personas que buscan mejorar la estética de su auto para uso personal o reventa.\n- Clientes que buscan una opción económica sin sacrificar calidad.",
      costStructure: "- Materiales (pintura, solventes, lijas, pulimento).\n- Salarios del personal.\n- Renta del taller.\n- Servicios (luz, agua).\n- Publicidad.",
      revenueStreams: "- Cobro por pieza pintada.\n- Reparaciones de golpes y abolladuras.\n- Servicios de pulido y encerado.\n- Trabajos de pintura general."
    },
    "pizzeria-siglo-xxi": {
        keyPartners: "- Organizaciones para la inclusión laboral de personas con discapacidad.\n- Proveedores de ingredientes de calidad (harina, queso, etc.).\n- Empresas locales interesadas en colaborar con un negocio social.",
        keyActivities: "- Producción de pizzas y galletas artesanales.\n- Capacitación y soporte continuo para personal con síndrome de Down.\n- Marketing y promoción de la marca y su misión social.\n- Desarrollo de relaciones con clientes y la comunidad.",
        keyResources: "- Personal capacitado y motivado (panaderos con síndrome de Down).\n- Local y equipamiento de cocina.\n- Plataforma digital para ventas en línea y promoción.",
        valueProposition: "Pizzas y galletas artesanales que satisfacen a los clientes, creadas en un ambiente inclusivo que proporciona empleo y formación a personas con síndrome de Down.",
        customerRelationships: "- Servicio al cliente personalizado y de calidad.\n- Comunicación abierta sobre los productos y la misión de inclusión.\n- Creación de una comunidad que apoya la inclusión laboral.",
        channels: "- Local de venta al público.\n- Ventas en línea con servicio de entrega a domicilio.\n- Redes sociales para marketing y contar historias.",
        customerSegments: "- Familias y personas que disfrutan de comida artesanal.\n- Empresas y oficinas buscando opciones de catering con impacto social.\n- Comunidad que apoya activamente la inclusión laboral de personas con discapacidad.",
        costStructure: "- Costos de producción (ingredientes, materiales).\n- Costos laborales (salarios) y de capacitación para el personal.\n- Alquiler y mantenimiento del local y equipamiento.\n- Costos de marketing y promoción.",
        revenueStreams: "- Venta de pizzas y galletas al público en general.\n- Venta a restaurantes y comercios locales.\n- Catering para eventos de empresas."
    },
    "papeleria-la-sirena": {
        keyPartners: "- Proveedores mayoristas de papelería (Dany's, Tuksonora).\n- Escuelas locales para posibles convenios.\n- Negocios cercanos para promoción cruzada.",
        keyActivities: "- Comercialización de artículos de papelería y mercería.\n- Gestión de inventario y compras a proveedores en Hermosillo.\n- Servicio de fotocopiado e impresión.\n- Atención al cliente en punto de venta.",
        keyResources: "- Local comercial en Kino Viejo.\n- Inventario de productos de alta demanda.\n- Equipo de copiado e impresión.\n- Socios con experiencia en comercialización.",
        valueProposition: "La papelería y mercería más completa y convenientemente ubicada en Kino Viejo, ofreciendo todos los útiles escolares y servicios de copiado necesarios para la comunidad estudiantil y las familias locales.",
        customerRelationships: "- Atención directa y personalizada en el local.\n- Conocimiento de las necesidades de los clientes locales (listas de útiles, etc.).",
        channels: "- Punto de venta físico y bien ubicado.\n- Publicidad visual en el local y sus alrededores.\n- Recomendación de boca en boca dentro de la comunidad.",
        customerSegments: "- Estudiantes de los 7 planteles educativos de la comunidad.\n- Familias de Kino Viejo y comunidades aledañas.\n- Maestros y personal administrativo de las escuelas.",
        costStructure: "- Compra de inventario a proveedores mayoristas.\n- Costos de traslado a Hermosillo para reabastecimiento.\n- Costos operativos del local (luz, agua).\n- Salarios del personal.",
        revenueStreams: "- Venta de artículos de papelería y mercería.\n- Ingresos por servicio de fotocopiado e impresión de documentos."
    },
    "cocina-economica": {
        keyPartners: "- Proveedores locales de alimentos (carnicerías, verdulerías).\n- Mina 'La Caridad de Nacozari' para posibles convenios de comida para trabajadores.\n- Negocios locales para promoción.",
        keyActivities: "- Elaboración de comida casera y menús del día.\n- Venta directa en el local.\n- Limpieza y mantenimiento de la cocina.\n- Compras y gestión de inventario de insumos.",
        keyResources: "- Mano de obra con experiencia en la elaboración de comida casera.\n- Local ubicado estratégicamente cerca de la mina.\n- Recetas de comida tradicional.",
        valueProposition: "Comida casera, saludable y económica para los trabajadores de la mina y la comunidad de Nacozari, ofreciendo una opción rápida y nutritiva cerca del lugar de trabajo.",
        customerRelationships: "- Trato amable y rápido, enfocado en el horario de comida de los trabajadores.\n- Relación directa con los clientes en el punto de venta.",
        channels: "- Venta directa en la cocina económica.\n- Publicidad local a través de volantes y carteles.\n- Posible servicio de entrega a las instalaciones de la mina.",
        customerSegments: "- Obreros y trabajadores de la mina 'La Caridad de Nacozari'.\n- Familias y residentes de la Colonia Presidentes y alrededores.\n- Personas que buscan una opción de comida casera y económica.",
        costStructure: "- Compra de insumos (carne, verduras, abarrotes).\n- Salarios del personal.\n- Costos de servicios del local (luz, agua, gas).\n- Renta del local (si aplica).",
        revenueStreams: "- Venta de platillos del menú del día.\n- Venta de bebidas (refrescos, aguas frescas).\n- Posibles contratos de servicio de comedor para cuadrillas de la mina."
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
      setCanvasData(canvasDataSets[projectId as keyof typeof canvasDataSets] || canvasDataSets["cafe-aroma"]);
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
                        <SelectItem value="taller-carroceria">Proyecto: Taller de Carrocería y Pintura</SelectItem>
                        <SelectItem value="pizzeria-siglo-xxi">Proyecto: Pizzería Siglo XXI</SelectItem>
                        <SelectItem value="papeleria-la-sirena">Proyecto: Papelería La Sirena</SelectItem>
                        <SelectItem value="cocina-economica">Proyecto: Cocina Económica Nacozari</SelectItem>
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
