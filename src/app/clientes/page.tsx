
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { ArrowRightSquare } from "lucide-react";

const customerCanvases = [
  { 
    name: 'Mapa de Empatía', 
    description: 'Para entender profundamente a tu cliente: qué piensa, siente, ve, oye, dice y hace.',
    fields: ["¿Qué piensa y siente?", "¿Qué ve?", "¿Qué oye?", "¿Qué dice y hace?", "Esfuerzos (dolores)", "Resultados (ganancias)"]
  },
  { 
    name: 'Buyer Persona', 
    description: 'Para crear un perfil semi-ficticio de tu cliente ideal basado en datos reales.',
    fields: ["Datos demográficos", "Metas y objetivos", "Frustraciones y desafíos", "Motivaciones", "Canales de comunicación", "Historia personal"]
  },
  { 
    name: 'Mapa del Viaje del Cliente', 
    description: 'Para visualizar todas las interacciones del cliente con tu empresa e identificar puntos de mejora.',
    fields: ["Etapas del viaje", "Puntos de contacto", "Acciones del cliente", "Pensamientos y emociones", "Oportunidades de mejora"]
  },
];

export default function ClientesPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Entendiendo a tu Cliente"
                description="Utiliza estas herramientas para analizar y empatizar con tu público objetivo."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customerCanvases.map((canvas) => (
                    <Card key={canvas.name} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{canvas.name}</CardTitle>
                            <CardDescription>{canvas.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <h4 className="font-semibold text-sm">Campos del lienzo:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {canvas.fields.map(field => <li key={field}>{field}</li>)}
                            </ul>
                        </CardContent>
                        <CardFooter className="mt-auto flex justify-between items-center">
                            <Button>
                                <ArrowRightSquare className="mr-2 h-4 w-4" />
                                Usar Lienzo
                            </Button>
                            <div className="flex items-center space-x-2">
                                <Checkbox id={`na-${canvas.name}`} />
                                <Label htmlFor={`na-${canvas.name}`} className="text-sm font-medium leading-none text-muted-foreground">
                                    No aplica
                                </Label>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
