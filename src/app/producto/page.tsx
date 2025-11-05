
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Save, History, Redo, Undo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ProductState = {
  name: string;
  description: string;
  valueProposition: string;
  lifecycle: string;
  ip: string;
};

const projectData: Record<string, ProductState> = {
    "cositas": {
        name: "Ecosistema Digital 'Cositas'",
        description: "Un ecosistema digital compuesto por tres pilares: un marketplace para descubrimiento hiper-local, un asistente de IA para la gestión de MiPymes y una pasarela de pagos offline-first. Está optimizado para dispositivos de gama baja y zonas con conectividad limitada.",
        valueProposition: "A diferencia de las soluciones fragmentadas, Cositas ofrece una herramienta 3-en-1 que soluciona la invisibilidad digital, la gestión ineficiente y la exclusión financiera del comercio de barrio. Nuestra ventaja competitiva es la integración de estos tres pilares y un diseño offline-first.",
        lifecycle: "Fase 1: Lanzamiento del marketplace para lograr masa crítica de usuarios. Fase 2: Introducción del asistente IA de gestión para aumentar la retención de vendedores. Fase 3: Despliegue de la pasarela de pagos offline. A largo plazo, se contempla la expansión a otras ciudades y países de Latinoamérica.",
        ip: "La marca 'Cositas' y su logotipo se registrarán en el IMPI. Los algoritmos de IA y, crucialmente, el protocolo de pagos offline basado en blockchain, se protegerán como secreto industrial, ya que constituyen nuestra principal barrera de entrada tecnológica."
    },
    "cafe-aroma": {
        name: "Café de Especialidad 'Aroma de Montaña'",
        description: "Ofrecemos granos de café 100% arábica de origen único, cultivados en las altas montañas de Chiapas. Nuestro proceso de tostado artesanal, realizado en lotes pequeños, garantiza la máxima frescura y resalta las notas de sabor únicas de cada cosecha, que van desde cítricos y florales hasta achocolatados y afrutados. El café se vende en grano o molido según la preferencia del cliente.",
        valueProposition: "A diferencia del café comercial de supermercado, nuestro producto ofrece una experiencia sensorial completa y transparente. Cada bolsa cuenta la historia de la finca y el productor detrás de ella. Nuestra PUV es 'frescura garantizada': tostamos el café bajo demanda, justo antes de enviarlo, asegurando que el cliente reciba un producto en su punto óptimo de sabor, algo que las grandes marcas no pueden igualar.",
        lifecycle: "Actualmente estamos en la versión 1.0 de nuestro empaque y oferta de productos. Para el próximo trimestre, planeamos introducir una línea de 'micro-lotes' de edición limitada con perfiles exóticos. En 6 meses, lanzaremos una versión 2.0 de nuestro empaque, 100% compostable. A largo plazo (1-2 años), exploramos la posibilidad de ofrecer cápsulas compatibles con sistemas populares, pero utilizando nuestro café de alta calidad.",
        ip: "La marca 'Aroma de Montaña' y su logotipo están en proceso de registro ante el IMPI. Los diseños de nuestros empaques son creaciones originales y están protegidos por derechos de autor. No poseemos patentes sobre el proceso, ya que nos basamos en técnicas artesanales tradicionales, pero nuestro 'know-how' y las relaciones exclusivas con los productores son un activo intangible clave."
    },
    "restaurante-gambusinos": {
        name: "Restaurant-Bar 'Gambusinos'",
        description: "Servicio de restaurante y bar con un concepto regional. Ofrecemos un menú variado basado en la cocina popular del Río Sonora, con servicio de buffet por la mañana y a la carta por la tarde. El bar, con temática minera, transmite eventos deportivos y ofrece una amplia variedad de licores y cervezas.",
        valueProposition: "La auténtica experiencia gastronómica y social del Río Sonora. Somos la principal opción de alimentos y bebidas para turistas y locales en Aconchi, gracias a nuestro concepto único que combina un ambiente familiar de día y un bar animado de noche.",
        lifecycle: "Fase de lanzamiento con un menú y concepto definidos. A futuro, se planea la introducción de menús de temporada basados en ingredientes locales y la organización de eventos culturales y musicales para fortalecer la relación con la comunidad.",
        ip: "El nombre 'Gambusinos' y la temática minera son parte central de nuestra identidad de marca. Las recetas de la cocina regional son adaptaciones propias, constituyendo un activo intelectual importante."
    },
    "ecoturismo-la-salina": {
        name: "Campo Ecoturístico La Salina",
        description: "Ofrecemos paquetes de recorridos ecoturísticos guiados en la conjunción única del desierto de Sonora y el Mar de Cortés. Los servicios incluyen caminatas, observación de flora y fauna, recorridos históricos a asentamientos Pápago, y observación sideral nocturna. Se ofrece alojamiento rústico en instalaciones rehabilitadas.",
        valueProposition: "Una experiencia de inmersión auténtica en un ecosistema único, guiada por los protectores ancestrales del territorio (los ejidatarios). A diferencia de otros operadores, conectamos al visitante con la riqueza natural, histórica y cultural de la Reserva de la Biósfera del Alto Golfo.",
        lifecycle: "El proyecto se encuentra en su fase inicial, ofreciendo 6 paquetes de recorridos. En el segundo año, se planea añadir un servicio de restaurante de mariscos y adecuar áreas para casas rodantes. A largo plazo, se buscará la certificación de guías turísticos y la ampliación de la infraestructura de hospedaje de bajo impacto.",
        ip: "El conocimiento profundo del área por parte de los guías locales es nuestro principal activo intangible. Se buscará registrar la marca 'Campo Ecoturístico La Salina' para proteger la identidad del proyecto. Las rutas y relatos de los recorridos son creaciones intelectuales propias."
    },
    "taller-carroceria": {
        name: "Taller de Carrocería y Pintura Express",
        description: "Servicio de reparación de carrocería y pintura enfocado en golpes menores, pintura general, pulido y encerado. Nos especializamos en devolver la apariencia de 'auto nuevo' a vehículos del año 2000 en adelante.",
        valueProposition: "Ofrecemos un servicio rápido, económico y de alta calidad con atención personalizada. Nuestra principal ventaja es el seguimiento post-servicio para garantizar la satisfacción total del cliente, generando confianza y superando a la competencia que a menudo carece de este detalle.",
        lifecycle: "Fase inicial de operación con equipamiento básico. El plan a mediano plazo incluye la adquisición de una cabina de pintura profesional para mejorar acabados y la expansión del equipo con más pintores. A largo plazo, se buscarán convenios con aseguradoras y flotillas locales.",
        ip: "La ventaja principal es el 'know-how' y la experiencia de más de 10 años de los fundadores. La marca y el modelo de atención al cliente son los activos a proteger y desarrollar."
    },
    "pizzeria-siglo-xxi": {
        name: "Pizzería Siglo XXI - 'Sabores que unen'",
        description: "Una pizzería especializada en la elaboración de pizzas y galletas artesanales, con la particularidad de que todos nuestros empleados son personas con síndrome de Down. Ofrecemos productos de alta calidad en un ambiente inclusivo.",
        valueProposition: "Somos más que una pizzería. Ofrecemos sabores que unen a la comunidad, brindando una experiencia gastronómica de alta calidad y, al mismo tiempo, una oportunidad para apoyar la inclusión laboral y la diversidad. Tu compra tiene un impacto social directo.",
        lifecycle: "Actualmente en fase de lanzamiento. El plan a mediano plazo es expandir el programa de capacitación para incluir habilidades de liderazgo. A largo plazo, se contempla la apertura de nuevas sucursales o la creación de un modelo de franquicia social.",
        ip: "La marca 'Pizzería Siglo XXI' y su modelo de negocio de inclusión social son el principal activo intelectual. El programa de capacitación y los procesos adaptados son propiedad intelectual clave de la organización."
    },
    "papeleria-la-sirena": {
        name: "Papelería y Mercería La Sirena",
        description: "Comercialización de una amplia variedad de artículos de papelería y mercería, además de ofrecer servicios de fotocopiado e impresión de documentos. Estamos ubicados convenientemente para servir a la comunidad estudiantil de Kino Viejo.",
        valueProposition: "Somos la solución integral y más conveniente para las necesidades escolares y de manualidades en Kino Viejo. Nuestra ventaja competitiva radica en la ubicación estratégica cerca de 7 planteles educativos y una oferta de productos más completa que la competencia, que se encuentra a mayor distancia.",
        lifecycle: "Fase inicial de operación con un inventario básico. El plan a mediano plazo es ampliar la línea de productos de mercería y adquirir una copiadora multifuncional de alta capacidad para aumentar los ingresos por servicios.",
        ip: "El principal activo es el punto de venta establecido y el conocimiento del mercado local y las listas de útiles escolares. La marca 'La Sirena' buscará posicionarse como el referente en la comunidad."
    },
     "cocina-economica": {
        name: "Cocina Económica Nacozari",
        description: "Ofrecemos un menú diario de comida casera, saludable y a precios accesibles, orientado principalmente a los trabajadores de la mina 'La Caridad' y la comunidad de Nacozari.",
        valueProposition: "Somos la opción de comida casera más rápida, nutritiva y conveniente cerca de la mina. A diferencia de otros establecimientos, nuestra ubicación estratégica en los accesos a la mina nos permite servir al sector obrero de manera eficiente, ofreciéndoles una alternativa saludable a la comida chatarra.",
        lifecycle: "Fase de lanzamiento con un menú rotativo. A futuro, se planea establecer convenios directos para el servicio de comedor a cuadrillas de la mina y expandir el menú con platillos especiales de fin de semana para las familias locales.",
        ip: "Las recetas de comida tradicional y el modelo de servicio rápido son los activos clave. La marca 'Cocina Económica Nacozari' buscará consolidarse como el punto de referencia para la comida de los trabajadores mineros."
    }
};


export default function ProductPage() {
    const [selectedProject, setSelectedProject] = useState("cositas");
    const [product, setProduct] = useState<ProductState>(projectData[selectedProject]);

     const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setProduct(projectData[projectId as keyof typeof projectData]);
    };

    const handleSave = () => {
        console.log("Guardando datos del producto:", product);
        alert("Datos del producto guardados en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-grow">
                     <PageHeader
                        title="Descripción de Producto o Servicio"
                        description="Detalla qué vendes, qué lo hace especial y cómo evolucionará."
                        projectSelector={
                           <Select value={selectedProject} onValueChange={handleProjectChange}>
                              <SelectTrigger className="w-auto border-none shadow-none text-xl font-bold p-0 focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cositas">Proyecto: Cositas</SelectItem>
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

            <Card>
                <CardHeader>
                    <CardTitle>Lienzo del Producto/Servicio</CardTitle>
                    <CardDescription>Utiliza los siguientes campos para construir una descripción completa y atractiva de tu oferta principal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="product-name">Nombre del Producto o Servicio</Label>
                        <Input id="product-name" value={product.name} onChange={createChangeHandler(setProduct, 'name')} placeholder="Ej. Café de Especialidad 'Aroma de Montaña'" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="product-description">Descripción Detallada</Label>
                        <Textarea id="product-description" value={product.description} onChange={createChangeHandler(setProduct, 'description')} placeholder="¿Qué es y cómo funciona? Describe sus características y beneficios clave." rows={5}/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-uvp">Propuesta Única de Valor (PUV)</Label>
                        <Textarea id="product-uvp" value={product.valueProposition} onChange={createChangeHandler(setProduct, 'valueProposition')} placeholder="¿Qué lo hace único, diferente y mejor que las alternativas del mercado?" rows={4}/>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="product-lifecycle">Ciclo de Vida y Futuro del Producto</Label>
                        <Textarea id="product-lifecycle" value={product.lifecycle} onChange={createChangeHandler(setProduct, 'lifecycle')} placeholder="¿Hay planes para futuras versiones, mejoras o nuevos productos/servicios relacionados?" rows={4}/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-ip">Protección y Propiedad Intelectual</Label>
                        <Textarea id="product-ip" value={product.ip} onChange={createChangeHandler(setProduct, 'ip')} placeholder="¿El producto está protegido por patentes, marcas registradas, derechos de autor? ¿Cuál es la estrategia de PI?" rows={3}/>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
