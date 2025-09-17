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

const businessModelCanvases = [
  { name: 'Lienzo de la Propuesta de Valor', description: 'Para asegurar que tu producto o servicio resuelve problemas y crea alegrías reales para tus clientes.' },
  { name: 'Lienzo del Modelo de Negocio', description: 'Para describir, diseñar y visualizar tu modelo de negocio completo en una sola página.' },
  { name: 'Lean Canvas', description: 'Adaptación del Business Model Canvas para startups, enfocada en problema, solución, métricas y ventaja.' },
  { name: 'Product Canvas', description: 'Para definir la visión, objetivos, funcionalidades y métricas de un producto específico.' },
];


export default function DisenoNegocioPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Diseñando tu Negocio"
                description="Estructura y visualiza los componentes clave de tu modelo de negocio."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessModelCanvases.map((canvas) => (
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