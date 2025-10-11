
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save } from "lucide-react";

type ProductCanvasState = {
  productName: string;
  vision: string;
  targetGroup: string;
  needs: string;
  keyFeatures: string;
  metrics: string;
};

const initialState: ProductCanvasState = {
    productName: "VisionIA - Módulo de Plan Financiero",
    vision: "Convertirse en la herramienta estándar para la creación de proyecciones financieras realistas y de grado de inversión para startups en Latinoamérica.",
    targetGroup: "- Emprendedores sin fondo financiero.\n- Asesores de negocio en incubadoras.\n- Estudiantes de finanzas y administración.",
    needs: "- Necesitan crear proyecciones (Flujo de Efectivo, Estado de Resultados) sin ser expertos en Excel.\n- Necesitan entender y calcular KPIs financieros clave (CAC, LTV, Burn Rate).\n- Necesitan un modelo que se adapte a las regulaciones locales (ej. carga social).",
    keyFeatures: "- Formulario de supuestos guiado (ingresos, costos, personal).\n- Generación automática de Estados Financieros a 5 años.\n- Dashboard de KPIs interactivo.\n- Calculadora de carga social integrada (IMSS, ISN).",
    metrics: "- Tasa de finalización del módulo financiero.\n- Tiempo promedio para generar el primer set de proyecciones.\n- Puntuación de satisfacción del usuario (CSAT) sobre la claridad de los resultados.\n- Número de planes financieros exportados."
};

export default function ProductCanvasPage() {
    const [state, setState] = useState<ProductCanvasState>(initialState);

    const handleSave = () => {
        console.log("Guardando Product Canvas:", state);
        alert("Lienzo guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <PageHeader
                    title="Product Canvas"
                    description="Define y alinea la visión, objetivos, funcionalidades y métricas de un producto específico."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lienzo del Producto</CardTitle>
                    <CardDescription>Completa las secciones para tener una visión 360° de tu producto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                           <Label htmlFor="productName" className="text-base font-semibold">Nombre del Producto/Iniciativa</Label>
                           <Textarea id="productName" value={state.productName} onChange={createChangeHandler(setState, 'productName')} placeholder="¿Cómo se llama este producto o funcionalidad?" rows={1}/>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="vision" className="text-base font-semibold">1. Visión</Label>
                            <Textarea id="vision" value={state.vision} onChange={createChangeHandler(setState, 'vision')} placeholder="¿Cuál es la razón de ser de este producto? ¿Qué quieres lograr con él?" rows={5}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="targetGroup" className="text-base font-semibold">2. Público Objetivo</Label>
                            <Textarea id="targetGroup" value={state.targetGroup} onChange={createChangeHandler(setState, 'targetGroup')} placeholder="¿Para quién es este producto? ¿Quiénes son los usuarios y clientes?" rows={5}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="needs" className="text-base font-semibold">3. Necesidades</Label>
                            <Textarea id="needs" value={state.needs} onChange={createChangeHandler(setState, 'needs')} placeholder="¿Qué problemas, necesidades o deseos de tu público objetivo resuelve este producto?" rows={5}/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="keyFeatures" className="text-base font-semibold">4. Características Clave</Label>
                            <Textarea id="keyFeatures" value={state.keyFeatures} onChange={createChangeHandler(setState, 'keyFeatures')} placeholder="¿Cuáles son las 3-5 funcionalidades principales que componen el producto?" rows={5}/>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="metrics" className="text-base font-semibold">5. Métricas de Éxito</Label>
                            <Textarea id="metrics" value={state.metrics} onChange={createChangeHandler(setState, 'metrics')} placeholder="¿Cómo sabrás que el producto es exitoso? ¿Qué indicadores medirás?" rows={5}/>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
