"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { businessPlanGuide } from "@/lib/business-plan-guide";
import { BookOpen } from "lucide-react";

export default function BusinessPlanGuide() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpen className="mr-2" />
                    Guía de Emprendimiento para Plan de Negocios
                </CardTitle>
                <CardDescription>
                    Una guía detallada para construir un plan de negocios sólido.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {businessPlanGuide.map((unit) => (
                        <AccordionItem value={unit.unit} key={unit.unit}>
                            <AccordionTrigger className="text-lg font-bold font-headline">
                                {unit.unit}: {unit.title}
                            </AccordionTrigger>
                            <AccordionContent>
                                <ul className="list-disc space-y-2 pl-6">
                                    {unit.sections.map((section) => (
                                        <li key={section.id}>
                                            <span className="font-semibold">{section.id} {section.title}</span>
                                            {section.points && (
                                                <ul className="list-circle space-y-1 pl-6 mt-1">
                                                    {section.points.map((point, index) => (
                                                        <li key={index}>{point}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div className="mt-4 text-sm text-muted-foreground">
                    <h4 className="font-bold mb-2">Notas de uso:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Los apartados marcados “si aplica” se adecuan al giro (repostería, flores, bisutería, sublimación, estética, etc.).</li>
                        <li>Mantén el lenguaje sencillo, datos verificables y evidencias claras (fotos, cotizaciones, tickets).</li>
                        <li>El Resumen Ejecutivo debe poder leerse solo y convencer: problema, solución, cliente, competencia, números clave y uso del capital.</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}
