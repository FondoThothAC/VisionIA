
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save } from "lucide-react";

type PestelState = {
  politicos: string;
  economicos: string;
  sociales: string;
  tecnologicos: string;
  ecologicos: string;
  legales: string;
};

const initialPestelState: PestelState = {
    politicos: "- Acuerdos comerciales favorables para la exportación de café (Oportunidad).\n- Inestabilidad política en regiones cafetaleras puede afectar el suministro (Amenaza).",
    economicos: "- Aumento del poder adquisitivo de la clase media que busca productos premium (Oportunidad).\n- Inflación y aumento en costos de logística (Amenaza).\n- Volatilidad del tipo de cambio para compras de equipo importado (Amenaza).",
    sociales: "- Creciente interés en la cultura del café de especialidad y la preparación en casa (Oportunidad).\n- Tendencia hacia un consumo más consciente y ético (Oportunidad).\n- Cambios en los hábitos de consumo, prefiriendo la rapidez sobre la calidad (Amenaza).",
    tecnologicos: "- Nuevas plataformas de e-commerce y marketing digital facilitan el acceso a clientes (Oportunidad).\n- Mejoras en la tecnología de tostado para mayor consistencia (Oportunidad).\n- Necesidad de inversión constante para mantenerse tecnológicamente relevante (Amenaza).",
    ecologicos: "- Demanda por empaques sostenibles y biodegradables (Oportunidad).\n- El cambio climático afecta las cosechas y la calidad del grano (Amenaza).\n- Regulaciones ambientales más estrictas sobre el tratamiento de residuos del café (Amenaza).",
    legales: "- Normativas de etiquetado de alimentos más exigentes (Amenaza).\n- Leyes de protección al consumidor que regulan la publicidad (Amenaza).\n- Legislación laboral que aumenta los costos de personal (Amenaza)."
};


export default function PestelPage() {
    const [pestel, setPestel] = useState<PestelState>(initialPestelState);

    const handleSave = () => {
        console.log("Guardando análisis PESTEL:", pestel);
        alert("Análisis PESTEL guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <PageHeader
                    title="Análisis PESTEL"
                    description="Identifica los factores del macroentorno que pueden impactar tu negocio."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar Progreso
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lienzo PESTEL</CardTitle>
                    <CardDescription>Analiza cada una de las seis áreas para identificar oportunidades y amenazas clave.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="politicos" className="text-lg font-semibold">Políticos</Label>
                        <Textarea id="politicos" value={pestel.politicos} onChange={createChangeHandler(setPestel, 'politicos')} placeholder="Leyes, políticas fiscales, estabilidad..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="economicos" className="text-lg font-semibold">Económicos</Label>
                        <Textarea id="economicos" value={pestel.economicos} onChange={createChangeHandler(setPestel, 'economicos')} placeholder="Crecimiento, inflación, tasas de interés..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sociales" className="text-lg font-semibold">Sociales</Label>
                        <Textarea id="sociales" value={pestel.sociales} onChange={createChangeHandler(setPestel, 'sociales')} placeholder="Tendencias, demografía, estilos de vida..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tecnologicos" className="text-lg font-semibold">Tecnológicos</Label>
                        <Textarea id="tecnologicos" value={pestel.tecnologicos} onChange={createChangeHandler(setPestel, 'tecnologicos')} placeholder="Innovaciones, automatización, I+D..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ecologicos" className="text-lg font-semibold">Ecológicos</Label>
                        <Textarea id="ecologicos" value={pestel.ecologicos} onChange={createChangeHandler(setPestel, 'ecologicos')} placeholder="Leyes ambientales, cambio climático..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="legales" className="text-lg font-semibold">Legales</Label>
                        <Textarea id="legales" value={pestel.legales} onChange={createChangeHandler(setPestel, 'legales')} placeholder="Leyes de protección al consumidor, normativas laborales..." rows={6}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
