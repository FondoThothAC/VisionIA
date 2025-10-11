
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
import { Save, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

type EmpathyMapState = {
  thinksAndFeels: string;
  sees: string;
  hears: string;
  saysAndDoes: string;
  pains: { id: number; description: string; solution: string }[];
  gains: { id: number; description: string; creator: string }[];
};

type BuyerPersonaState = {
  demographics: string;
  goals: string;
  frustrations: string;
  motivations: string;
  communicationChannels: string;
  story: string;
};

type CustomerJourneyMapState = {
    awareness: string;
    consideration: string;
    purchase: string;
    service: string;
    loyalty: string;
}

const initialEmpathyMap: EmpathyMapState = {
    thinksAndFeels: "Preocupado por el impacto ambiental, busca productos éticos. Se siente bien al apoyar a pequeños productores. Valora la calidad y la historia detrás del producto.",
    sees: "Publicidad de grandes marcas de café. Amigos publicando fotos de cafés de especialidad en redes sociales. Noticias sobre cambio climático y comercio justo.",
    hears: "Podcasts sobre sostenibilidad. Recomendaciones de amigos. Baristas explicando el origen del café.",
    saysAndDoes: "Pregunta sobre el origen del café en las cafeterías. Compra café en grano para molerlo en casa. Lee etiquetas y certificaciones. Comparte sus descubrimientos en Instagram.",
    pains: [
      { id: 1, description: "Dificultad para encontrar información transparente sobre el origen.", solution: "Ofrecer un código QR en cada bolsa que lleva a la historia de la finca y el productor." },
      { id: 2, description: "Precios elevados sin justificación clara de la calidad.", solution: "Comunicar claramente el valor: tostado fresco, comercio justo, calidad de especialidad." },
      { id: 3, description: "Falta de opciones sostenibles en supermercados.", solution: "Crear un modelo de suscripción online para un acceso fácil y recurrente." },
    ],
    gains: [
        { id: 1, description: "Sentimiento de contribución a una buena causa.", creator: "Destinar un porcentaje de cada venta a proyectos de desarrollo comunitario en la región cafetalera." },
        { id: 2, description: "Disfrutar de un café de alta calidad con perfiles de sabor únicos.", creator: "Ofrecer guías de catación y notas de sabor detalladas con cada café." },
        { id: 3, description: "Descubrir nuevos sabores y orígenes.", creator: "Lanzar 'micro-lotes' de edición limitada de fincas experimentales cada mes." },
    ]
};

const initialBuyerPersona: BuyerPersonaState = {
    demographics: "Ana, 32 años, diseñadora gráfica, vive en una ciudad grande, ingresos medios-altos, soltera.",
    goals: "Encontrar un café de alta calidad que se alinee con sus valores de sostenibilidad. Disfrutar de un ritual matutino placentero y significativo.",
    frustrations: "El café comercial sabe 'quemado'. No confía en las etiquetas 'orgánicas' sin una historia detrás. Poca disponibilidad de café fresco.",
    motivations: "Apoyar el comercio local y justo. La calidad y el sabor. La estética de los empaques y la marca.",
    communicationChannels: "Instagram, blogs de estilo de vida y sostenibilidad, email newsletters de marcas que le gustan.",
    story: "Ana trabaja desde casa y su café matutino es un momento sagrado. Ha probado muchas marcas, pero busca 'su' café definitivo: uno que no solo sea delicioso, sino que también la haga sentir bien con su compra."
};

const initialCustomerJourneyMap: CustomerJourneyMapState = {
    awareness: "Ana ve un anuncio en Instagram sobre 'Aroma de Montaña' y le atrae la fotografía y el mensaje de comercio justo.",
    consideration: "Visita la web, lee la historia de los productores en Chiapas, compara los precios de suscripción y lee reseñas de otros clientes.",
    purchase: "Decide probar con una bolsa de tueste medio. El proceso de compra es fácil y rápido. Recibe un correo de confirmación con detalles del envío.",
    service: "Recibe el paquete en un empaque ecológico con una nota de agradecimiento escrita a mano. El café llega en 3 días. Tiene una duda sobre el método de preparación y recibe una respuesta rápida y amable por chat.",
    loyalty: "El café es excelente. Ana publica una historia en Instagram etiquetando a la marca. Se suscribe al plan mensual para recibir café automáticamente y obtener un descuento."
}


export default function ClientesPage() {
    const [empathyMap, setEmpathyMap] = useState<EmpathyMapState>(initialEmpathyMap);
    const [buyerPersona, setBuyerPersona] = useState<BuyerPersonaState>(initialBuyerPersona);
    const [journeyMap, setJourneyMap] = useState<CustomerJourneyMapState>(initialCustomerJourneyMap);

    const handleSave = () => {
        console.log("Guardando datos del cliente:", { empathyMap, buyerPersona, journeyMap });
        alert("Datos del cliente guardados en la consola.");
    }

    const createChangeHandler = <T,>(setter: React.Dispatch<React.SetStateAction<T>>) => (field: keyof T) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    const handleEmpathyTextChange = createChangeHandler(setEmpathyMap);
    const handlePersonaChange = createChangeHandler(setBuyerPersona);
    const handleJourneyChange = createChangeHandler(setJourneyMap);

    const handleDynamicEmpathyChange = (
      section: 'pains' | 'gains', 
      id: number, 
      field: 'description' | 'solution' | 'creator', 
      value: string
    ) => {
        setEmpathyMap(prev => ({
            ...prev,
            [section]: prev[section].map(item => 
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const addDynamicEmpathyItem = (section: 'pains' | 'gains') => {
        const newItem = section === 'pains' 
            ? { id: Date.now(), description: "", solution: "" }
            : { id: Date.now(), description: "", creator: "" };
        
        setEmpathyMap(prev => ({
            ...prev,
            [section]: [...prev[section], newItem as any]
        }));
    };

    const removeDynamicEmpathyItem = (section: 'pains' | 'gains', id: number) => {
        setEmpathyMap(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };


    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <PageHeader
                    title="Entendiendo a tu Cliente"
                    description="Utiliza estas herramientas para analizar y empatizar con tu público objetivo."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar Progreso
                </Button>
            </div>

            <div className="space-y-8">
                {/* Empathy Map / Value Proposition Canvas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Lienzo de la Propuesta de Valor</CardTitle>
                        <CardDescription>Conecta los problemas y deseos de tu cliente con las soluciones que ofreces.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                         {/* Left Side: General Empathy */}
                        <div className="space-y-6">
                            <CardTitle className="text-xl">Perfil del Cliente</CardTitle>
                            <div className="space-y-2">
                                <Label htmlFor="thinksAndFeels">¿Qué PIENSA y SIENTE?</Label>
                                <Textarea id="thinksAndFeels" value={empathyMap.thinksAndFeels} onChange={handleEmpathyTextChange('thinksAndFeels')} placeholder="Principales preocupaciones, aspiraciones..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="sees">¿Qué VE?</Label>
                                <Textarea id="sees" value={empathyMap.sees} onChange={handleEmpathyTextChange('sees')} placeholder="En su entorno, amigos, ofertas de mercado..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hears">¿Qué OYE?</Label>
                                <Textarea id="hears" value={empathyMap.hears} onChange={handleEmpathyTextChange('hears')} placeholder="Lo que dicen amigos, jefe, influencers..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="saysAndDoes">¿Qué DICE y HACE?</Label>
                                <Textarea id="saysAndDoes" value={empathyMap.saysAndDoes} onChange={handleEmpathyTextChange('saysAndDoes')} placeholder="Actitud en público, apariencia, comportamiento..." />
                            </div>
                        </div>

                        {/* Right Side: Pains/Gains & Solutions */}
                        <div className="space-y-6">
                           <CardTitle className="text-xl">Mapa de Valor (Tu Solución)</CardTitle>
                           
                            {/* Pains & Solutions */}
                            <div className="space-y-4 p-4 bg-red-50/50 rounded-lg border border-red-200">
                                <Label className="text-red-800 text-lg font-semibold">Frustraciones (Dolores)</Label>
                                {empathyMap.pains.map((pain, index) => (
                                    <div key={pain.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start relative">
                                        <div className="space-y-1">
                                            <Label htmlFor={`pain-desc-${pain.id}`} className="text-sm">Punto de Dolor {index + 1}</Label>
                                            <Textarea id={`pain-desc-${pain.id}`} value={pain.description} onChange={(e) => handleDynamicEmpathyChange('pains', pain.id, 'description', e.target.value)} placeholder="Miedos, frustraciones, obstáculos..." className="bg-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`pain-sol-${pain.id}`} className="text-sm text-primary">Aliviador de Frustración</Label>
                                            <Textarea id={`pain-sol-${pain.id}`} value={pain.solution} onChange={(e) => handleDynamicEmpathyChange('pains', pain.id, 'solution', e.target.value)} placeholder="¿Cómo lo solucionas?" className="bg-white border-primary focus-visible:ring-primary" />
                                        </div>
                                         <Button variant="ghost" size="icon" onClick={() => removeDynamicEmpathyItem('pains', pain.id)} className="absolute -top-2 -right-2 h-7 w-7 text-destructive/70 hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={() => addDynamicEmpathyItem('pains')} className="w-full mt-2">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir Punto de Dolor
                                </Button>
                            </div>

                             {/* Gains & Creators */}
                            <div className="space-y-4 p-4 bg-green-50/50 rounded-lg border border-green-200">
                                <Label className="text-green-800 text-lg font-semibold">Alegrías (Ganancias)</Label>
                                {empathyMap.gains.map((gain, index) => (
                                    <div key={gain.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start relative">
                                        <div className="space-y-1">
                                            <Label htmlFor={`gain-desc-${gain.id}`} className="text-sm">Deseo / Ganancia {index + 1}</Label>
                                            <Textarea id={`gain-desc-${gain.id}`} value={gain.description} onChange={(e) => handleDynamicEmpathyChange('gains', gain.id, 'description', e.target.value)} placeholder="Deseos, necesidades, éxito..." className="bg-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor={`gain-creator-${gain.id}`} className="text-sm text-primary">Creador de Alegría</Label>
                                            <Textarea id={`gain-creator-${gain.id}`} value={gain.creator} onChange={(e) => handleDynamicEmpathyChange('gains', gain.id, 'creator', e.target.value)} placeholder="¿Cómo creas esta ganancia?" className="bg-white border-primary focus-visible:ring-primary" />
                                        </div>
                                         <Button variant="ghost" size="icon" onClick={() => removeDynamicEmpathyItem('gains', gain.id)} className="absolute -top-2 -right-2 h-7 w-7 text-destructive/70 hover:text-destructive">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                 <Button variant="outline" size="sm" onClick={() => addDynamicEmpathyItem('gains')} className="w-full mt-2">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Añadir Alegría
                                </Button>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* Buyer Persona */}
                <Card>
                    <CardHeader>
                        <CardTitle>Buyer Persona</CardTitle>
                        <CardDescription>Crea un perfil semi-ficticio de tu cliente ideal basado en datos reales y los insights del mapa de empatía.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="demographics">Datos Demográficos e Identificadores</Label>
                            <Textarea id="demographics" value={buyerPersona.demographics} onChange={handlePersonaChange('demographics')} placeholder="Nombre, edad, profesión, hobbies..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="goals">Metas y Objetivos</Label>
                            <Textarea id="goals" value={buyerPersona.goals} onChange={handlePersonaChange('goals')} placeholder="¿Qué quiere lograr personal o profesionalmente?" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="frustrations">Frustraciones y Desafíos</Label>
                            <Textarea id="frustrations" value={buyerPersona.frustrations} onChange={handlePersonaChange('frustrations')} placeholder="¿Qué le impide alcanzar sus metas? (Basado en los 'Dolores')" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="motivations">Motivaciones</Label>
                            <Textarea id="motivations" value={buyerPersona.motivations} onChange={handlePersonaChange('motivations')} placeholder="¿Qué le impulsa a actuar? (Basado en las 'Alegrías')" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="communicationChannels">Canales de Comunicación y Marketing</Label>
                            <Textarea id="communicationChannels" value={buyerPersona.communicationChannels} onChange={handlePersonaChange('communicationChannels')} placeholder="¿Dónde consume información? Redes sociales, blogs..." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="story">Historia Personal / Cita</Label>
                            <Textarea id="story" value={buyerPersona.story} onChange={handlePersonaChange('story')} placeholder="Una pequeña historia que resuma su situación o una cita que le represente." />
                        </div>
                    </CardContent>
                </Card>
                
                 {/* Customer Journey Map */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mapa del Viaje del Cliente</CardTitle>
                        <CardDescription>Visualiza todas las interacciones del cliente con tu empresa para identificar puntos de mejora.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="awareness">1. Conciencia (Awareness)</Label>
                            <Textarea id="awareness" value={journeyMap.awareness} onChange={handleJourneyChange('awareness')} placeholder="¿Cómo te descubre el cliente? Puntos de contacto, acciones, pensamientos y oportunidades." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="consideration">2. Consideración</Label>
                            <Textarea id="consideration" value={journeyMap.consideration} onChange={handleJourneyChange('consideration')} placeholder="¿Cómo te evalúa? Puntos de contacto, acciones, pensamientos y oportunidades." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="purchase">3. Compra (Purchase)</Label>
                            <Textarea id="purchase" value={journeyMap.purchase} onChange={handleJourneyChange('purchase')} placeholder="¿Cómo decide comprar? Puntos de contacto, acciones, pensamientos y oportunidades." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="service">4. Servicio (Service)</Label>
                            <Textarea id="service" value={journeyMap.service} onChange={handleJourneyChange('service')} placeholder="¿Cómo es la experiencia post-venta? Puntos de contacto, acciones, pensamientos y oportunidades." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="loyalty">5. Lealtad (Loyalty)</Label>
                            <Textarea id="loyalty" value={journeyMap.loyalty} onChange={handleJourneyChange('loyalty')} placeholder="¿Cómo se convierte en un cliente recurrente y promotor? Puntos de contacto, acciones, pensamientos y oportunidades." />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
