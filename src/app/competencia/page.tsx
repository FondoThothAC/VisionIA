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

const competitionCanvases = [
    { name: 'Lienzo de la Competencia', description: 'Para analizar y comparar de forma estructurada a tus competidores directos e indirectos.' },
];


export default function CompetenciaPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Análisis de Competencia"
                description="Analiza y compara a tus competidores para encontrar tu ventaja única."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {competitionCanvases.map((canvas) => (
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