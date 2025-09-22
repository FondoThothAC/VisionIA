
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
import { Save } from "lucide-react";

type EmpathyMapState = {
  thinksAndFeels: string;
  sees: string;
  hears: string;
  saysAndDoes: string;
  pains: string;
  gains: string;
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
    pains: "Dificultad para encontrar información transparente. Precios elevados. Falta de opciones sostenibles en supermercados.",
    gains: "Sentimiento de contribución a una buena causa. Disfrutar de un café de alta calidad. Descubrir nuevos sabores y perfiles."
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

    const handleEmpathyChange = createChangeHandler(setEmpathyMap);
    const handlePersonaChange = createChangeHandler(setBuyerPersona);
    const handleJourneyChange = createChangeHandler(setJourneyMap);

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
                {/* Empathy Map */}
                <Card>
                    <CardHeader>
                        <CardTitle>Mapa de Empatía</CardTitle>
                        <CardDescription>Para entender profundamente a tu cliente: qué piensa, siente, ve, oye, dice y hace.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="thinksAndFeels">¿Qué PIENSA y SIENTE?</Label>
                            <Textarea id="thinksAndFeels" value={empathyMap.thinksAndFeels} onChange={handleEmpathyChange('thinksAndFeels')} placeholder="Principales preocupaciones, aspiraciones..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sees">¿Qué VE?</Label>
                            <Textarea id="sees" value={empathyMap.sees} onChange={handleEmpathyChange('sees')} placeholder="En su entorno, amigos, ofertas de mercado..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="hears">¿Qué OYE?</Label>
                            <Textarea id="hears" value={empathyMap.hears} onChange={handleEmpathyChange('hears')} placeholder="Lo que dicen amigos, jefe, influencers..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="saysAndDoes">¿Qué DICE y HACE?</Label>
                            <Textarea id="saysAndDoes" value={empathyMap.saysAndDoes} onChange={handleEmpathyChange('saysAndDoes')} placeholder="Actitud en público, apariencia, comportamiento..." />
                        </div>
                        <div className="space-y-2 p-4 bg-red-50/50 rounded-lg border border-red-200">
                            <Label htmlFor="pains" className="text-red-800">Esfuerzos (DOLORES)</Label>
                            <Textarea id="pains" value={empathyMap.pains} onChange={handleEmpathyChange('pains')} placeholder="Miedos, frustraciones, obstáculos..." className="bg-white"/>
                        </div>
                        <div className="space-y-2 p-4 bg-green-50/50 rounded-lg border border-green-200">
                            <Label htmlFor="gains" className="text-green-800">Resultados (GANANCIAS)</Label>
                            <Textarea id="gains" value={empathyMap.gains} onChange={handleEmpathyChange('gains')} placeholder="Deseos, necesidades, medida del éxito..." className="bg-white" />
                        </div>
                    </CardContent>
                </Card>

                {/* Buyer Persona */}
                <Card>
                    <CardHeader>
                        <CardTitle>Buyer Persona</CardTitle>
                        <CardDescription>Para crear un perfil semi-ficticio de tu cliente ideal basado en datos reales.</CardDescription>
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
                            <Textarea id="frustrations" value={buyerPersona.frustrations} onChange={handlePersonaChange('frustrations')} placeholder="¿Qué le impide alcanzar sus metas?" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="motivations">Motivaciones</Label>
                            <Textarea id="motivations" value={buyerPersona.motivations} onChange={handlePersonaChange('motivations')} placeholder="¿Qué le impulsa a actuar?" />
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
                        <CardDescription>Para visualizar todas las interacciones del cliente con tu empresa e identificar puntos de mejora.</CardDescription>
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

    