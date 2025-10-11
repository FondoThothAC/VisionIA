
"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageHeader from "@/components/page-header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const sections = [
    {
        value: "item-1",
        title: "1. Resumen Ejecutivo",
        intro: "Preguntas Guía: ¿Cuál es tu negocio en una frase? ¿Qué problema solucionas? ¿Cuál es tu misión y visión? ¿Cuánto necesitas para empezar y cuál es el retorno esperado?",
        subtopics: [
            { title: "Nota para la app", description: "Este módulo se auto-rellenará con la información de las otras secciones una vez completadas." }
        ],
    },
    {
        value: "item-2",
        title: "2. Descripción General del Negocio",
        intro: "Presentación formal de tu negocio, detallando la idea, misión, visión y objetivos.",
        subtopics: [
            { title: "Nombre y Giro del Proyecto", description: "" },
            { title: "Ubicación (Estado, Municipio, Comunidad)", description: "" },
            { title: "Producto o Servicio Principal", description: "" },
            { title: "Justificación (Oportunidad de mercado, necesidad social)", description: "" },
        ],
    },
    {
        value: "item-3",
        title: "3. Perfil del Grupo / Emprendedor",
        intro: "Describe quién está detrás del proyecto.",
        subtopics: [
            { title: "Historia y motivación del grupo o individuo", description: "" },
            { title: "Experiencia y habilidades relevantes", description: "" },
            { title: "Recursos existentes (activos con los que ya cuentan)", description: "" },
        ],
    },
    {
        value: "item-4",
        title: "4. Objetivos y Metas (SMART)",
        intro: "Define el gran propósito y las acciones concretas para alcanzarlo.",
        subtopics: [
            { title: "Objetivo General", description: "El gran propósito." },
            { title: "Objetivos Específicos", description: "Acciones concretas." },
            { title: "Metas Cuantificables", description: "Ventas proyectadas, empleos a generar, utilidades." },
            { title: "Plazos", description: "Corto (1 año), Mediano (2-3 años), Largo (5 años)." },
        ],
    },
    {
        value: "item-5",
        title: "5. Análisis de Mercado",
        intro: "Demuestra que entiendes la industria, tus clientes y tu competencia.",
        subtopics: [
            { title: "Validación de Demanda (Empírica)", description: "¿Realizaste preventas, encuestas o entrevistas para confirmar el interés?" },
            { title: "Demanda", description: "Perfil del cliente potencial (segmentación), poder adquisitivo, hábitos de consumo." },
            { title: "Oferta", description: "Análisis de la competencia directa e indirecta (fortalezas, debilidades, precios)." },
            { title: "Cálculo del Mercado Potencial", description: "Tamaño total del mercado y participación esperada (market share)." },
        ],
    },
    {
        value: "item-6",
        title: "6. Estrategia de Comercialización",
        intro: "Plan de acción para llegar a tus clientes y convencerlos de comprar.",
        subtopics: [
            { title: "Canales de Venta", description: "¿Cómo llegarás al cliente? (Tienda física, online, redes sociales)." },
            { title: "Estrategia de Precios", description: "¿Cómo fijarás tus precios? (Basado en costos, competencia, valor)." },
            { title: "Promoción y Publicidad", description: "¿Cómo te darás a conocer?" },
            { title: "Propuesta Única de Valor (PUV)", description: "¿Qué te hace diferente y especial?" },
            { title: "Alianzas Locales Estratégicas", description: "Colaboraciones con negocios o grupos locales para promoción cruzada." },
        ],
    },
    {
        value: "item-7",
        title: "7. Modelo de Negocio (Business Model Canvas)",
        intro: "Implementar un lienzo interactivo del Business Model Canvas con sus 9 bloques.",
        subtopics: [],
    },
    {
        value: "item-8",
        title: "8. Estudio Técnico y Operativo",
        intro: "Detalla cómo funcionará tu negocio en el día a día.",
        subtopics: [
            { title: "Proceso", description: "Diagrama de flujo del proceso productivo o de servicio." },
            { title: "Localización y Distribución", description: "Descripción y croquis del local." },
            { title: "Equipamiento y Proveedores", description: "Lista de maquinaria necesaria y proveedores clave." },
            { title: "Costeo Unitario de Producto (BOM)", description: "Desglose de costos por cada unidad de producto." },
            { title: "Normatividad y Cumplimiento Legal", description: "Permisos y licencias requeridos para operar según el giro." },
        ],
    },
    {
        value: "item-9",
        title: "9. Plan de Recursos Humanos",
        intro: "Define la estructura de tu equipo y el impacto personal.",
        subtopics: [
            { title: "Organigrama", description: "Estructura de roles y jerarquía." },
            { title: "Perfiles de Puesto", description: "Responsabilidades y habilidades por rol." },
            { title: "Plan de Capacitación", description: "¿Qué formación necesita el equipo?" },
            { title: "Impacto Familiar y Personal", description: "Cómo el proyecto mejora el ingreso familiar y personal." },
        ],
    },
    {
        value: "item-10",
        title: "10. Cronograma de Ejecución y Lanzamiento",
        intro: "Implementar un Diagrama de Gantt simple para planificar las actividades clave en el tiempo.",
        subtopics: [
            { title: "Plan de Lanzamiento (Primeros 90 días)", description: "Acciones concretas para las primeras 12 semanas." }
        ],
    },
    {
        value: "item-11",
        title: "11. Análisis Financiero (Proyecciones a 5 años)",
        intro: "Los números que respaldan todo lo dicho anteriormente.",
        subtopics: [
            { title: "Inversión Inicial", description: "Activos fijos, diferidos y capital de trabajo." },
            { title: "Proyección de Ingresos", description: "Ventas estimadas (volumen x precio), considerando estacionalidad y picos de venta." },
            { title: "Proyección de Costos", description: "Costos fijos y variables." },
            { title: "Estado de Resultados Proyectado", description: "" },
            { title: "Punto de Equilibrio", description: "" },
            { title: "Flujo de Efectivo Proyectado", description: "" },
            { title: "Indicadores de Rentabilidad", description: "VAN, TIR y B/C." },
        ],
    },
    {
        value: "item-12",
        title: "12. Análisis de Riesgos",
        intro: "Implementar una matriz para identificar riesgos, su probabilidad, impacto y planes de mitigación.",
        subtopics: [
            { title: "Matriz de Riesgos", description: "Identificar riesgos (operativos, financieros, de mercado, etc.), su categoría, probabilidad, impacto, plan de mitigación y contingencia." },
        ],
    },
    {
        value: "item-13",
        title: "13. Impacto Social y Sostenibilidad (Si aplica)",
        intro: "Describe el impacto positivo de tu proyecto más allá de lo económico.",
        subtopics: [
            { title: "Generación de empleo en grupos vulnerables", description: "" },
            { title: "Sostenibilidad ambiental", description: "" },
            { title: "Inclusión social", description: "" },
        ],
    },
    {
        value: "item-14",
        title: "14. Anexos y Evidencias",
        intro: "Implementar una sección para que el usuario pueda subir archivos de soporte.",
        subtopics: [
            { title: "Evidencia de Ventas Iniciales", description: "Tickets, transferencias, pedidos de WhatsApp." },
            { title: "Documentos de Soporte", description: "Cotizaciones, croquis, currículums, etc." },
        ],
    },
];

const businessModels = [
    { id: 'venta-unica', label: 'Venta Única' },
    { id: 'suscripcion', label: 'Suscripción' },
    { id: 'freemium', label: 'Freemium' },
    { id: 'bait-hook', label: 'Bait & Hook (Cebo y Anzuelo)' },
    { id: 'marketplace', label: 'Marketplace (Plataforma)' },
    { id: 'publicidad', label: 'Publicidad' },
    { id: 'afiliacion', label: 'Afiliación' },
];

type BusinessModelsState = Record<string, boolean>;


export default function GuiaPlanNegociosPage() {
    const [companySize, setCompanySize] = useState<string>("");
    const [projectNature, setProjectNature] = useState<string>("");
    const [selectedModels, setSelectedModels] = useState<BusinessModelsState>({});

    const handleModelChange = (id: string) => {
        setSelectedModels(prev => ({ ...prev, [id]: !prev[id] }));
    }

    const getSelectedModelLabels = () => {
        return businessModels
            .filter(model => selectedModels[model.id])
            .map(model => model.label);
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Guía Definitiva para Planes de Negocio"
                description="Tu hoja de ruta para un proyecto exitoso, basada en la estructura común de casos de éxito."
            />

            <Card>
                <CardHeader>
                    <CardTitle>Personaliza tu Guía</CardTitle>
                    <CardDescription>
                        Selecciona las características de tu empresa para adaptar las recomendaciones. (Funcionalidad futura)
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="company-size">Tamaño de la Empresa</Label>
                        <Select value={companySize} onValueChange={setCompanySize}>
                            <SelectTrigger id="company-size">
                                <SelectValue placeholder="Selecciona un tamaño..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="solopreneur">Emprendimiento Solitario (1 persona)</SelectItem>
                                <SelectItem value="micro">Microempresa (hasta 10 empleados)</SelectItem>
                                <SelectItem value="small">Pequeña Empresa (11-50 empleados)</SelectItem>
                                <SelectItem value="medium">Mediana Empresa (51-250 empleados)</SelectItem>
                                <SelectItem value="large">Empresa Grande (más de 250 empleados)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="project-nature">Naturaleza del Proyecto</Label>
                        <Select value={projectNature} onValueChange={setProjectNature}>
                            <SelectTrigger id="project-nature">
                                <SelectValue placeholder="Selecciona una naturaleza..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="startup">Startup (En busca de un modelo de negocio escalable)</SelectItem>
                                <SelectItem value="scaleup">Scale-up (Crecimiento acelerado de un modelo probado)</SelectItem>
                                <SelectItem value="deeptech">Deep Tech / Alto Impacto (Basado en innovación científica/tecnológica)</SelectItem>
                                <SelectItem value="traditional">Negocio Tradicional (PyME)</SelectItem>
                                <SelectItem value="social">Emprendimiento Social / A.C. (Enfocado en impacto social)</SelectItem>
                                <SelectItem value="corporate">Intraemprendimiento (Proyecto dentro de una empresa existente)</SelectItem>
                                <SelectItem value="unique">Proyecto Único / Finito (Evento, construcción, etc.)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                         <Label>Modelo(s) de Negocio</Label>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left font-normal">
                                    <div className="flex-grow">
                                        {getSelectedModelLabels().length === 0 && <span className="text-muted-foreground">Selecciona uno o más modelos...</span>}
                                        {getSelectedModelLabels().length > 0 && 
                                            <div className="flex flex-wrap gap-1">
                                                {getSelectedModelLabels().map(label => <Badge key={label} variant="secondary">{label}</Badge>)}
                                            </div>
                                        }
                                    </div>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64" align="start">
                                <DropdownMenuLabel>Selecciona los modelos aplicables</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {businessModels.map(model => (
                                    <DropdownMenuCheckboxItem
                                        key={model.id}
                                        checked={selectedModels[model.id] || false}
                                        onCheckedChange={() => handleModelChange(model.id)}
                                        onSelect={(e) => e.preventDefault()}
                                    >
                                        {model.label}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Estructura Estandarizada VisionIA</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {sections.map((section) => (
                            <AccordionItem value={section.value} key={section.value}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                                    {section.title}
                                </AccordionTrigger>
                                <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                                    <p className="lead">{section.intro}</p>
                                    {section.subtopics.length > 0 && (
                                        <>
                                            <h4>Subtemas Clave:</h4>
                                            <ul>
                                                {section.subtopics.map((sub, index) => (
                                                    <li key={index}>
                                                        <strong>{sub.title}:</strong>
                                                        {sub.description && ` ${sub.description}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </div>
    );
}
