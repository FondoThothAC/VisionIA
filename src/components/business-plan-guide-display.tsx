"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Section {
    id?: string;
    title: string;
    points?: string[];
}

interface Unit {
    unit: string;
    title: string;
    sections?: Section[];
}

interface SimpleUnit {
    unit: string;
    title: string;
}

type Guide = Unit[] | SimpleUnit[];

interface BusinessPlanGuideDisplayProps {
    guide: Guide;
}

function isComplexGuide(guide: Guide): guide is Unit[] {
    return (guide as Unit[])[0]?.sections !== undefined;
}

export default function BusinessPlanGuideDisplay({ guide }: BusinessPlanGuideDisplayProps) {
    if (isComplexGuide(guide)) {
        return (
            <Accordion type="single" collapsible className="w-full">
                {guide.map((unit) => (
                    <AccordionItem value={unit.unit} key={unit.unit}>
                        <AccordionTrigger className="text-lg font-bold font-headline">
                            {unit.unit}: {unit.title}
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="list-disc space-y-2 pl-6">
                                {unit.sections?.map((section) => (
                                    <li key={section.id || section.title}>
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
                <div className="mt-4 text-sm text-muted-foreground">
                    <h4 className="font-bold mb-2">Notas de uso:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Los apartados marcados “si aplica” se adecuan al giro (repostería, flores, bisutería, sublimación, estética, etc.).</li>
                        <li>Mantén el lenguaje sencillo, datos verificables y evidencias claras (fotos, cotizaciones, tickets).</li>
                        <li>El Resumen Ejecutivo debe poder leerse solo y convencer: problema, solución, cliente, competencia, números clave y uso del capital.</li>
                    </ul>
                </div>
            </Accordion>
        );
    }

    // Render simple guide
    return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
            <ul>
                {guide.map((item, index) => (
                    <li key={index}>
                        <strong>{item.unit}</strong> {item.title && `- ${item.title}`}
                    </li>
                ))}
            </ul>
        </div>
    );
}
