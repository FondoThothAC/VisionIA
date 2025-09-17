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

const strategicAnalysisCanvases = [
  { name: 'Análisis FODA', description: 'Para evaluar las Fortalezas, Oportunidades, Debilidades y Amenazas de tu negocio.' },
];


export default function AnalisisEstrategicoPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Análisis Estratégico"
                description="Evalúa el entorno y la posición de tu empresa en el mercado."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {strategicAnalysisCanvases.map((canvas) => (
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