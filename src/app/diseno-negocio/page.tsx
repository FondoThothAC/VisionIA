
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

const businessModelCanvases = [
  { 
    name: 'Lienzo de la Propuesta de Valor', 
    description: 'Para asegurar que tu producto o servicio resuelve problemas y crea alegrías reales para tus clientes.',
    fields: ["Propuesta de Valor", "Segmento(s) de Clientes", "Alegrías", "Frustraciones", "Productos y Servicios", "Creadores de Alegrías", "Aliviadores de Frustraciones"]
  },
  { 
    name: 'Lienzo del Modelo de Negocio', 
    description: 'Para describir, diseñar y visualizar tu modelo de negocio completo en una sola página.',
    fields: ["Socios Clave", "Actividades Clave", "Recursos Clave", "Propuesta de Valor", "Relación con Clientes", "Canales", "Segmentos de Clientes", "Estructura de Costos", "Fuentes de Ingresos"]
  },
  { 
    name: 'Lean Canvas', 
    description: 'Adaptación del Business Model Canvas para startups, enfocada en problema, solución, métricas y ventaja.',
    fields: ["Problema", "Solución", "Métricas Clave", "Propuesta de Valor Única", "Ventaja Injusta", "Canales", "Segmentos de Clientes", "Estructura de Costos", "Flujos de Ingresos"]
  },
  { 
    name: 'Product Canvas', 
    description: 'Para definir la visión, objetivos, funcionalidades y métricas de un producto específico.',
    fields: ["Visión del Producto", "Público Objetivo", "Necesidades", "Características Principales", "Métricas de Éxito", "Restricciones y Riesgos"]
  },
];


export default function DisenoNegocioPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Diseñando tu Negocio"
                description="Estructura y visualiza los componentes clave de tu modelo de negocio."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {businessModelCanvases.map((canvas) => (
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
