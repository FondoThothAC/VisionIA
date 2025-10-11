
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Save, Trash2, History, Redo, Undo } from "lucide-react";
import PageHeader from "@/components/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Competitor = {
  id: number;
  name: string;
  valueProposition: string;
  customerSegment: string;
  pricing: string;
  strengths: string;
  weaknesses: string;
  marketingStrategy: string;
};

const competitorData: Record<string, Competitor[]> = {
    "cafe-aroma": [
        {
            id: 1,
            name: "Café 'El Origen'",
            valueProposition: "Café orgánico de origen único, enfocado en la historia del productor.",
            customerSegment: "Consumidores éticos y conocedores de café (B2C).",
            pricing: "Premium, 15-20% más caro que el nuestro.",
            strengths: "Fuerte branding y storytelling. Empaques atractivos. Buena presencia en redes.",
            weaknesses: "Distribución limitada, solo venden en su web. Poca variedad de tuestes.",
            marketingStrategy: "Marketing de contenidos, colaboraciones con influencers de sostenibilidad.",
        },
        {
            id: 2,
            name: "Suministros 'Cafetal'",
            valueProposition: "Proveedor B2B de café a granel a precios competitivos.",
            customerSegment: "Cafeterías y restaurantes que buscan volumen y bajo costo (B2B).",
            pricing: "Bajo, enfocado en volumen. Descuentos por grandes compras.",
            strengths: "Precios muy competitivos. Logística eficiente para grandes pedidos.",
            weaknesses: "Calidad inconsistente. Nulo branding o conexión con el cliente final. Sin venta online B2C.",
            marketingStrategy: "Venta directa y equipo comercial. Sin marketing digital visible.",
        }
    ],
    "restaurante-gambusinos": [
        {
            id: 1,
            name: "Restaurantes de comida corrida en Aconchi",
            valueProposition: "Comida casera y económica para locales y trabajadores.",
            customerSegment: "Trabajadores locales, familias que buscan una opción rápida.",
            pricing: "Económico, menú del día a precio fijo.",
            strengths: "Precios bajos, rapidez en el servicio.",
            weaknesses: "Poca o nula ambientación, menú limitado, no es un destino turístico.",
            marketingStrategy: "Reputación local de boca en boca, ubicación céntrica.",
        },
    ],
    "ecoturismo-la-salina": [
        {
            id: 1,
            name: "Reserva de la Biosfera El Pinacate",
            valueProposition: "Recorridos vehiculares y senderismo en un paisaje volcánico protegido y reconocido mundialmente.",
            customerSegment: "Turismo general, familias, entusiastas de la geología.",
            pricing: "Cuota de entrada fija por persona, administrada por el gobierno.",
            strengths: "Infraestructura bien establecida (centro de visitantes, caminos). Reconocimiento internacional (UNESCO).",
            weaknesses: "Enfocado en el paisaje desértico-volcánico, no en la costa. Actividades más pasivas (observación).",
            marketingStrategy: "Promoción a través de canales gubernamentales de turismo y CONANP.",
        },
        {
            id: 2,
            name: "CEDO (Centro Intercultural de Estudios de Desiertos y Océanos)",
            valueProposition: "Tours educativos y científicos enfocados en la vida marina y los estuarios.",
            customerSegment: "Estudiantes, académicos, turistas con alto interés en biología marina.",
            pricing: "Precios por tour, enfocados en grupos pequeños y con valor educativo.",
            strengths: "Personal científico (biólogos). Reputación académica. Enfoque especializado.",
            weaknesses: "Oferta de tours limitada y con horarios específicos. Menos enfocado en la aventura o la experiencia cultural.",
            marketingStrategy: "Alianzas con universidades, promoción en círculos académicos y de conservación.",
        },
    ],
    "taller-carroceria": [
         {
            id: 1,
            name: "Portillo Auto Carrocería",
            valueProposition: "Servicio de carrocería y pintura general.",
            customerSegment: "Clientes particulares y posiblemente aseguradoras.",
            pricing: "$800 por pieza de pintura.",
            strengths: "Tienen buen equipamiento y herramienta.",
            weaknesses: "Precios pueden ser un punto de comparación.",
            marketingStrategy: "Ubicación física y reputación establecida.",
        },
        {
            id: 2,
            name: "Auto Carrocería Castillo",
            valueProposition: "Servicio similar de reparación y pintura.",
            customerSegment: "Clientes particulares de la zona.",
            pricing: "$1300 por pieza de pintura, un precio más elevado.",
            strengths: "Buena ubicación y publicidad.",
            weaknesses: "Precios más altos, lo que abre una oportunidad para un servicio más económico.",
            marketingStrategy: "Publicidad local y ubicación.",
        },
    ],
    "pizzeria-siglo-xxi": [
        {
            id: 1,
            name: "Pizzerías de cadena (ej. Domino's, Little Caesars)",
            valueProposition: "Pizza rápida, económica y predecible.",
            customerSegment: "Familias y jóvenes que buscan una opción de comida rápida y económica.",
            pricing: "Precios bajos y promociones constantes (ej. 2x1).",
            strengths: "Fuerte reconocimiento de marca. Logística de entrega muy optimizada. Precios muy competitivos.",
            weaknesses: "Calidad de ingredientes estándar, no artesanal. Experiencia de cliente impersonal. Nulo enfoque social.",
            marketingStrategy: "Publicidad masiva en TV y medios digitales. Marketing de promociones.",
        },
        {
            id: 2,
            name: "Pizzerías locales artesanales",
            valueProposition: "Pizza de alta calidad con ingredientes gourmet o locales.",
            customerSegment: "Foodies, parejas y grupos de amigos que valoran la calidad y la experiencia gastronómica.",
            pricing: "Precios premium, por encima del promedio.",
            strengths: "Ingredientes de alta calidad. Sabor y experiencia únicos. Ambiente acogedor en el local.",
            weaknesses: "Menor capacidad de producción. Precios más elevados. Marketing menos agresivo.",
            marketingStrategy: "Marketing en redes sociales (Instagram), reseñas en blogs gastronómicos, reputación de boca en boca.",
        },
    ],
    "papeleria-la-sirena": [
        {
            id: 1,
            name: "Papelería Lupita",
            valueProposition: "Surtido básico de artículos escolares.",
            customerSegment: "Estudiantes y familias de la comunidad.",
            pricing: "Precios estándar de mercado.",
            strengths: "Ubicación conocida en la comunidad.",
            weaknesses: "Surtido limitado, no ofrece servicios adicionales como copiado o mercería.",
            marketingStrategy: "Existencia y reputación local.",
        },
        {
            id: 2,
            name: "Papelería Marlet",
            valueProposition: "Papelería con algo de mercería.",
            customerSegment: "Comunidad local en general.",
            pricing: "Similar a otras papelerías de la zona.",
            strengths: "Ofrece algunos productos de mercería.",
            weaknesses: "Distancia considerable del nuevo punto de venta. No tiene la ventaja de la ubicación para todas las escuelas.",
            marketingStrategy: "Reputación local.",
        },
    ],
    "cocina-economica": [
        {
            id: 1,
            name: "Otras cocinas económicas en el centro",
            valueProposition: "Comida casera a bajo precio.",
            customerSegment: "Población general y trabajadores del centro de Nacozari.",
            pricing: "Económico, menú del día a precio fijo.",
            strengths: "Ubicación céntrica, clientes establecidos.",
            weaknesses: "No están ubicadas cerca de los accesos a la mina, perdiendo al cliente obrero principal.",
            marketingStrategy: "Reputación local de boca en boca.",
        },
    ]
};

const CompetitorCard = ({ competitor, onUpdate, onRemove }: { competitor: Competitor, onUpdate: (id: number, field: keyof Competitor, value: string) => void, onRemove: (id: number) => void }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <Label htmlFor={`name-${competitor.id}`} className="text-xs text-muted-foreground">Nombre del Competidor</Label>
          <Input 
            id={`name-${competitor.id}`}
            value={competitor.name}
            onChange={(e) => onUpdate(competitor.id, 'name', e.target.value)}
            className="text-lg font-bold border-0 p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Nombre del Competidor"
          />
        </div>
        <Button variant="ghost" size="icon" onClick={() => onRemove(competitor.id)} className="h-8 w-8 shrink-0">
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor={`valueProposition-${competitor.id}`}>Propuesta de Valor</Label>
            <Textarea id={`valueProposition-${competitor.id}`} value={competitor.valueProposition} onChange={(e) => onUpdate(competitor.id, 'valueProposition', e.target.value)} placeholder="¿Qué ofrecen?" />
        </div>
        <div className="space-y-2">
            <Label htmlFor={`customerSegment-${competitor.id}`}>Segmento de Clientes</Label>
            <Textarea id={`customerSegment-${competitor.id}`} value={competitor.customerSegment} onChange={(e) => onUpdate(competitor.id, 'customerSegment', e.target.value)} placeholder="¿A quién le venden?" />
        </div>
        <div className="space-y-2">
            <Label htmlFor={`pricing-${competitor.id}`}>Precios</Label>
            <Textarea id={`pricing-${competitor.id}`} value={competitor.pricing} onChange={(e) => onUpdate(competitor.id, 'pricing', e.target.value)} placeholder="¿Cómo son sus precios?" />
        </div>
         <div className="space-y-2">
            <Label htmlFor={`marketingStrategy-${competitor.id}`}>Estrategia de Marketing</Label>
            <Textarea id={`marketingStrategy-${competitor.id}`} value={competitor.marketingStrategy} onChange={(e) => onUpdate(competitor.id, 'marketingStrategy', e.target.value)} placeholder="¿Cómo se promocionan?" />
        </div>
        <div className="space-y-2">
            <Label htmlFor={`strengths-${competitor.id}`}>Fortalezas</Label>
            <Textarea id={`strengths-${competitor.id}`} value={competitor.strengths} onChange={(e) => onUpdate(competitor.id, 'strengths', e.target.value)} placeholder="¿En qué son buenos?" />
        </div>
        <div className="space-y-2">
            <Label htmlFor={`weaknesses-${competitor.id}`}>Debilidades</Label>
            <Textarea id={`weaknesses-${competitor.id}`} value={competitor.weaknesses} onChange={(e) => onUpdate(competitor.id, 'weaknesses', e.target.value)} placeholder="¿Dónde tienen oportunidades?" />
        </div>
      </CardContent>
    </Card>
  );
};

export default function CompetitionCanvasPage() {
  const [selectedProject, setSelectedProject] = useState("cafe-aroma");
  const [competitors, setCompetitors] = useState<Competitor[]>(competitorData[selectedProject]);

  const handleProjectChange = (projectId: string) => {
      setSelectedProject(projectId);
      setCompetitors(competitorData[projectId as keyof typeof competitorData] || []);
  };

  const handleUpdate = (id: number, field: keyof Competitor, value: string) => {
    setCompetitors(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleAdd = () => {
    const newCompetitor: Competitor = {
        id: Date.now(),
        name: "",
        valueProposition: "",
        customerSegment: "",
        pricing: "",
        strengths: "",
        weaknesses: "",
        marketingStrategy: "",
    };
    setCompetitors(prev => [...prev, newCompetitor]);
  };

  const handleRemove = (id: number) => {
    setCompetitors(prev => prev.filter(c => c.id !== id));
  };
  
  const handleSave = () => {
    console.log("Guardando competidores:", competitors);
    alert("Análisis de competencia guardado en la consola.");
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row items-start justify-between gap-4">
         <div className="flex-grow">
             <PageHeader
                title="Lienzo de la Competencia"
                description="Añade y analiza a tus competidores para entender el panorama del mercado."
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

      <div className="space-y-6">
        {competitors.map(competitor => (
          <CompetitorCard
            key={competitor.id}
            competitor={competitor}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <Button variant="outline" onClick={handleAdd} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Añadir Competidor
      </Button>
    </div>
  );
}
