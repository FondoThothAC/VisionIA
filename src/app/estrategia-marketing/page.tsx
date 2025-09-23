
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
import { Save, AlertTriangle, TrendingDown, TrendingUp, ThumbsDown, PackageX, CalendarClock, Smile, Frown } from "lucide-react";

type DemandAnalysis = {
  [key: string]: string;
};

const demandTypes = [
  {
    key: "latente",
    title: "Demanda Latente",
    icon: AlertTriangle,
    description: "Existe una fuerte necesidad en el mercado que los productos actuales no satisfacen. El potencial es muy alto si se desarrolla el producto adecuado.",
    placeholder: "Ej: Antes de los smartphones, la gente quería acceso a internet móvil, pero no existía el dispositivo ideal.",
  },
  {
    key: "descenso",
    title: "Demanda en Descenso",
    icon: TrendingDown,
    description: "Las ventas del producto muestran una tendencia a la baja. Es crucial investigar las causas y tomar medidas correctivas o considerar retirar el producto.",
    placeholder: "Ej: Las ventas de reproductores de DVD han disminuido debido al auge del streaming.",
  },
  {
    key: "negativa",
    title: "Demanda Negativa",
    icon: ThumbsDown,
    description: "A una parte significativa del mercado no le agrada el producto o servicio y hasta pagaría por evitarlo. Se requiere un cambio de imagen o estrategia.",
    placeholder: "Ej: Mucha gente tiene una percepción negativa de las visitas al dentista. Las clínicas usan marketing para mostrar un ambiente relajado.",
  },
  {
    key: "nula",
    title: "Demanda Nula",
    icon: PackageX,
    description: "El mercado objetivo no valora o no considera necesario el producto. La estrategia es resaltar beneficios y conectarlos con los intereses del cliente.",
    placeholder: "Ej: En zonas con agua potable de excelente calidad, la venta de agua embotellada simple puede ser nula.",
  },
  {
    key: "irregular",
    title: "Demanda Irregular o Estacional",
    icon: CalendarClock,
    description: "Las ventas presentan alzas y bajas predecibles, ya sea por estación, mes o incluso día de la semana. Se deben ajustar la oferta y la producción.",
    placeholder: "Ej: La venta de abrigos en invierno, o la alta demanda en restaurantes los fines de semana.",
  },
  {
    key: "plenitud",
    title: "Demanda en Plenitud (Plena)",
    icon: Smile,
    description: "La empresa está satisfecha con su volumen de ventas. El objetivo es mantener la demanda a través de la mejora continua y la defensa de la cuota de mercado.",
    placeholder: "Ej: Una marca de refrescos líder en el mercado que se enfoca en mantener su popularidad con publicidad constante.",
  },
  {
    key: "sobredemanda",
    title: "Sobredemanda",
    icon: Frown,
    description: "La cantidad de demanda es mayor de la que la empresa puede o quiere manejar. Se pueden aplicar estrategias de 'desmarketing' para reducirla temporalmente.",
    placeholder: "Ej: Un restaurante exclusivo con listas de espera de meses puede subir los precios para gestionar la demanda.",
  },
];


export default function MarketingStrategyPage() {
    const [analysis, setAnalysis] = useState<DemandAnalysis>({});

    const handleAnalysisChange = (key: string, value: string) => {
        setAnalysis(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        console.log("Guardando análisis de demanda:", analysis);
        alert("Análisis de demanda guardado en la consola.");
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <PageHeader
                    title="Estrategia de Marketing y Demanda"
                    description="Analiza los diferentes tipos de demanda y define cómo tu negocio responderá a cada uno."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar Progreso
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Análisis de los Tipos de Demanda</CardTitle>
                    <CardDescription>Para cada tipo de demanda, analiza cómo se relaciona con tu producto o mercado. No todos aplicarán, pero es un ejercicio estratégico clave.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {demandTypes.map((demand) => {
                        const Icon = demand.icon;
                        return (
                            <div key={demand.key} className="space-y-2">
                                <Label htmlFor={demand.key} className="flex items-center gap-2 text-base font-semibold">
                                    <Icon className="h-5 w-5 text-primary" />
                                    {demand.title}
                                </Label>
                                <p className="text-sm text-muted-foreground">{demand.description}</p>
                                <Textarea 
                                    id={demand.key} 
                                    value={analysis[demand.key] || ""} 
                                    onChange={(e) => handleAnalysisChange(demand.key, e.target.value)} 
                                    placeholder={demand.placeholder}
                                    rows={3}
                                />
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
