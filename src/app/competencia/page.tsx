
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
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

const competitionCanvases = [
    { 
        name: 'Lienzo de la Competencia', 
        description: 'Para analizar y comparar de forma estructurada a tus competidores directos e indirectos.',
        fields: ["Competidor", "Propuesta de Valor", "Segmento de Clientes", "Precios", "Fortalezas", "Debilidades", "Estrategia de Marketing"],
        href: "/competencia/lienzo",
    },
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
                         <CardContent className="flex-grow space-y-4">
                          <h4 className="font-semibold text-sm">Campos del lienzo:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {canvas.fields.map(field => <li key={field}>{field}</li>)}
                          </ul>
                        </CardContent>
                        <CardFooter className="mt-auto flex justify-between items-center">
                            {canvas.href ? (
                                <Button asChild>
                                  <Link href={canvas.href}>
                                    <ArrowRightSquare className="mr-2 h-4 w-4" />
                                    Usar Lienzo
                                  </Link>
                                </Button>
                            ) : (
                                <Button>
                                    <ArrowRightSquare className="mr-2 h-4 w-4" />
                                    Usar Lienzo
                                </Button>
                            )}
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
