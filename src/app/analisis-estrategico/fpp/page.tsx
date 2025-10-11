
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";

type FppState = {
  actividadA: string;
  actividadB: string;
  recursoLimitado: string;
  costoOportunidad: string;
};

const initialFppState: FppState = {
    actividadA: "Desarrollar una nueva línea de café saborizado (ej. vainilla, canela).",
    actividadB: "Aumentar la producción y marketing de nuestro café de origen único más vendido.",
    recursoLimitado: "Horas del maestro tostador (40 horas/semana) y presupuesto de marketing ($10,000/mes).",
    costoOportunidad: "Por cada hora que el maestro tostador dedica a experimentar con sabores, se deja de tostar 5kg de nuestro café principal. Por cada $1,000 invertidos en marketing para el nuevo producto, se deja de alcanzar a 500 clientes potenciales para el producto existente."
};


export default function FppPage() {
    const [fpp, setFpp] = useState<FppState>(initialFppState);

    const handleSave = () => {
        console.log("Guardando análisis FPP:", fpp);
        alert("Análisis FPP guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <PageHeader
                    title="Lienzo de Asignación de Recursos (FPP)"
                    description="Analiza los trade-offs al asignar recursos limitados entre iniciativas competidoras."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar Progreso
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Frontera de Posibilidades de Producción</CardTitle>
                    <CardDescription>Define las dos opciones que compiten por los mismos recursos escasos para tomar una decisión informada.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="actividadA">Actividad / Producto A</Label>
                        <Textarea id="actividadA" value={fpp.actividadA} onChange={createChangeHandler(setFpp, 'actividadA')} placeholder="La primera iniciativa en la que puedes invertir recursos." rows={3}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="actividadB">Actividad / Producto B</Label>
                        <Textarea id="actividadB" value={fpp.actividadB} onChange={createChangeHandler(setFpp, 'actividadB')} placeholder="La segunda iniciativa que compite por los mismos recursos." rows={3}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="recursoLimitado">Recurso Limitado</Label>
                        <Input id="recursoLimitado" value={fpp.recursoLimitado} onChange={createChangeHandler(setFpp, 'recursoLimitado')} placeholder="Ej: Horas de ingeniería, presupuesto de marketing, tiempo del personal clave."/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="costoOportunidad">Análisis de Costo de Oportunidad</Label>
                        <Textarea id="costoOportunidad" value={fpp.costoOportunidad} onChange={createChangeHandler(setFpp, 'costoOportunidad')} placeholder="¿Qué sacrificas de 'A' por cada unidad adicional que produces o inviertes en 'B'?" rows={4}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
