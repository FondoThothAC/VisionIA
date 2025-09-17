
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

const strategicAnalysisCanvases = [
  { 
    name: 'Análisis FODA', 
    description: 'Para evaluar las Fortalezas, Oportunidades, Debilidades y Amenazas de tu negocio.',
    fields: [
      { title: "Fortalezas", description: "Capacidades internas que dan una ventaja." },
      { title: "Oportunidades", description: "Factores externos que se pueden aprovechar." },
      { title: "Debilidades", description: "Aspectos internos que ponen en desventaja." },
      { title: "Amenazas", description: "Factores externos que podrían perjudicar al negocio." },
    ]
  },
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
                        <CardContent className="flex-grow space-y-4">
                          <h4 className="font-semibold text-sm">Campos del lienzo:</h4>
                          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                            {canvas.fields.map(field => <li key={field.title}><strong>{field.title}:</strong> {field.description}</li>)}
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
