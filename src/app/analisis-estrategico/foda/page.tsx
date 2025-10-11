
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
import { Save, History, Undo, Redo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FodaState = {
  fortalezas: string;
  oportunidades: string;
  debilidades: string;
  amenazas: string;
};

const initialFodaState: FodaState = {
    fortalezas: "- Equipo con experiencia en la industria del café.\n- Relación directa con productores de alta calidad.\n- Marca con historia y propósito (storytelling).",
    oportunidades: "- Crecimiento del mercado de café de especialidad.\n- Aumento del consumo de productos éticos y sostenibles.\n- Posibilidad de exportación a mercados internacionales.",
    debilidades: "- Capital de trabajo limitado para grandes inventarios.\n- Poca experiencia en marketing digital a gran escala.\n- Dependencia de un número reducido de fincas proveedoras.",
    amenazas: "- Volatilidad en los precios del café verde.\n- Aparición de nuevas marcas competidoras con mayor presupuesto.\n- Cambios en las regulaciones de importación/exportación."
};


export default function FodaPage() {
    const [foda, setFoda] = useState<FodaState>(initialFodaState);

    const handleSave = () => {
        console.log("Guardando análisis FODA:", foda);
        alert("Análisis FODA guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-grow">
                     <PageHeader
                        title="Análisis FODA"
                        description="Evalúa las Fortalezas, Oportunidades, Debilidades y Amenazas de tu negocio."
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

            <Card>
                <CardHeader>
                    <CardTitle>Lienzo FODA</CardTitle>
                    <CardDescription>Rellena cada cuadrante para obtener una visión completa de tu posición estratégica.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 p-4 bg-green-50 rounded-lg border border-green-200">
                        <Label htmlFor="fortalezas" className="text-lg font-semibold text-green-800">Fortalezas (Interno, Positivo)</Label>
                        <Textarea id="fortalezas" value={foda.fortalezas} onChange={createChangeHandler(setFoda, 'fortalezas')} placeholder="¿En qué eres bueno? ¿Qué ventajas tienes?" rows={8} className="bg-white"/>
                    </div>
                    <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Label htmlFor="oportunidades" className="text-lg font-semibold text-blue-800">Oportunidades (Externo, Positivo)</Label>
                        <Textarea id="oportunidades" value={foda.oportunidades} onChange={createChangeHandler(setFoda, 'oportunidades')} placeholder="¿Qué tendencias del mercado puedes aprovechar? ¿Qué cambios tecnológicos te benefician?" rows={8} className="bg-white"/>
                    </div>
                    <div className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-200">
                        <Label htmlFor="debilidades" className="text-lg font-semibold text-red-800">Debilidades (Interno, Negativo)</Label>
                        <Textarea id="debilidades" value={foda.debilidades} onChange={createChangeHandler(setFoda, 'debilidades')} placeholder="¿En qué podrías mejorar? ¿Qué recursos te faltan?" rows={8} className="bg-white"/>
                    </div>
                    <div className="space-y-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <Label htmlFor="amenazas" className="text-lg font-semibold text-amber-800">Amenazas (Externo, Negativo)</Label>
                        <Textarea id="amenazas" value={foda.amenazas} onChange={createChangeHandler(setFoda, 'amenazas')} placeholder="¿Qué obstáculos enfrentas? ¿Qué hace tu competencia?" rows={8} className="bg-white"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
