
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
import { PlusCircle, Save, Trash2 } from "lucide-react";

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

const initialCompetitors: Competitor[] = [
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
];

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
  const [competitors, setCompetitors] = useState<Competitor[]>(initialCompetitors);

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
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div>
            <h1 className="font-headline text-3xl font-bold">Lienzo de la Competencia</h1>
            <p className="text-muted-foreground">Añade y analiza a tus competidores para entender el panorama del mercado.</p>
         </div>
         <div className="flex items-center gap-4 w-full md:w-auto">
            <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4"/>
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
