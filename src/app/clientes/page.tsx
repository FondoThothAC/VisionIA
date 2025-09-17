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
import PageHeader from "@/components/page-header";
import { ArrowRightSquare } from "lucide-react";

const customerCanvases = [
  { name: 'Mapa de Empatía', description: 'Para entender profundamente a tu cliente: qué piensa, siente, ve, oye, dice y hace.' },
  { name: 'Buyer Persona', description: 'Para crear un perfil semi-ficticio de tu cliente ideal basado en datos reales.' },
  { name: 'Mapa del Viaje del Cliente', description: 'Para visualizar todas las interacciones del cliente con tu empresa e identificar puntos de mejora.' },
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
                        <CardFooter className="mt-auto">
                            <Button>
                                <ArrowRightSquare className="mr-2 h-4 w-4" />
                                Usar Lienzo
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}