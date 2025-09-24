
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const levels = [
  {
    level: "Pestaña 1: Análisis del Entorno",
    value: "level-1",
    objective: "Comprender a fondo el mercado y tu posición en él. En esta sección, usarás las herramientas de análisis para tomar decisiones basadas en datos.",
    checklists: [
      {
        title: "1.1 - Entendiendo a tu Cliente",
        items: [
          {
            heading: "Panel de Aporte (Tu Información):",
            tasks: [
              "Campo: Describe las características generales de tu cliente (edad, ubicación, intereses).",
              "Botón [Reescribir con IA]: Mejora y enriquece la descripción de tu cliente.",
              "Botón [Investigar Mercado y Audiencia]: La IA analizará datos demográficos (usando fuentes como INEGI y tus documentos subidos) para validar y expandir tu perfil de cliente.",
            ],
          },
          {
            heading: "Panel de Visualización (Tu Plan):",
            tasks: [
                "Aquí se mostrarán de forma clara y guardada tu Mapa de Empatía y tu Buyer Persona una vez que los completes.",
            ],
          },
          {
            heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
            tasks: [
                "Información del Mundo Real: Presentará estadísticas sobre el tamaño del segmento de mercado, su poder adquisitivo y tendencias de consumo.",
                "Recomendación: Sugerirá nichos específicos o canales de marketing efectivos para ese perfil.",
                "Ponderación (Potencial de Mercado): Calificación de 1 a 10 sobre qué tan atractivo y accesible es el segmento de cliente que has elegido.",
            ],
          },
        ],
      },
      {
        title: "1.2 - Análisis de la Competencia",
        items: [
            {
                heading: "Panel de Aporte (Tu Información):",
                tasks: [
                    "Campo: Introduce los nombres de 3 a 5 competidores.",
                    "Botón [Reescribir con IA]: Estandariza los nombres y busca sus sitios web o redes sociales.",
                    "Botón [Analizar Competencia]: La IA investigará a estos competidores, extrayendo sus precios, productos estrella, y estrategias de marketing visibles.",
                ],
            },
            {
                heading: "Panel de Visualización (Tu Plan):",
                tasks: [
                    "Se mostrará el Lienzo de la Competencia completo, comparando cada competidor lado a lado.",
                ],
            },
            {
                heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
                tasks: [
                    "Información del Mundo Real: Resumen de las fortalezas y debilidades de la competencia. Identificará huecos en el mercado.",
                    "Recomendación: Sugerirá estrategias de diferenciación (ej. \"El competidor A es débil en servicio al cliente, puedes enfocarte ahí\").",
                    "Ponderación (Nivel de Competencia): Calificación de 1 a 10 sobre la intensidad competitiva del mercado.",
                ],
            }
        ],
      },
      {
        title: "1.3 - Análisis Estratégico (FODA)",
        items: [
            {
                heading: "Panel de Aporte (Tu Información):",
                tasks: [
                    "Campos: Llena cada cuadrante del FODA (Fortalezas, Oportunidades, Debilidades, Amenazas).",
                    "Botón [Reescribir con IA]: Refina tus puntos para que sean más claros y estratégicos.",
                    "Botón [Validar y Expandir FODA]: La IA cruzará tu FODA con la información de mercado y competencia para sugerir puntos adicionales que podrías haber pasado por alto.",
                ],
            },
            {
                heading: "Panel de Visualización (Tu Plan):",
                tasks: [
                    "Se mostrará tu Análisis FODA visualmente.",
                ],
            },
            {
                heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
                tasks: [
                    "Información del Mundo Real: Presentará estrategias basadas en el cruce de tus cuadrantes (Estrategias FO, DA, etc.).",
                    "Recomendación: Te dará 2 o 3 acciones prioritarias a tomar. (ej. \"Usa tu Fortaleza 1 para aprovechar la Oportunidad 2\").",
                    "Ponderación (Posición Estratégica): Calificación de 1 a 10 de tu posición actual en el mercado.",
                ],
            }
        ],
      }
    ],
  },
  {
    level: "Pestaña 2: Diseño de la Estrategia",
    value: "level-2",
    objective: "Crear el mapa maestro que define qué es tu negocio y cómo creará valor.",
    checklists: [
        {
            title: "2.1 - Identidad y Modelo de Negocio",
            items: [
                {
                    heading: "Panel de Aporte (Tu Información):",
                    tasks: [
                        "Campos: Rellena los 9 bloques del Business Model Canvas (o el Lean Canvas si eres startup). Define tu Misión, Visión y Valores.",
                        "Botón [Reescribir con IA]: Mejora la redacción de tu propuesta de valor y misión para que sea más impactante.",
                        "Botón [Evaluar Modelo de Negocio]: La IA analizará la coherencia entre los bloques de tu canvas (ej. \"¿Tu propuesta de valor realmente resuena con tus segmentos de clientes?\").",
                    ]
                },
                {
                    heading: "Panel de Visualización (Tu Plan):",
                    tasks: [
                        "Se mostrarán tu Lienzo de la Propuesta de Valor, Business Model Canvas y tu Identidad de Marca (Misión, Visión, Valores).",
                    ]
                },
                {
                    heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
                    tasks: [
                        "Información del Mundo Real: Ejemplos de modelos de negocio exitosos en tu industria.",
                        "Recomendación: Sugerirá posibles flujos de ingreso adicionales o socios clave que no habías considerado.",
                        "Ponderación (Viabilidad del Modelo): Calificación de 1 a 10 sobre la solidez y coherencia de tu modelo de negocio.",
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Pestaña 3: Desarrollo Táctico",
    value: "level-3",
    objective: "Detallar el \"cómo\" de cada área funcional para hacer realidad tu estrategia.",
    checklists: [
        {
            title: "3.1 - Plan de Operaciones y Producto",
            items: [
                 {
                    heading: "Panel de Aporte (Tu Información):",
                    tasks: [
                        "Campos: Describe tus procesos, lista el equipo necesario (activos fijos) y tus proveedores.",
                        "Botón [Reescribir con IA]: Estandariza tu lista de equipos y procesos para mayor claridad.",
                        "Botón [Optimizar Operaciones]: La IA puede sugerir eficiencias en tu diagrama de flujo o buscar proveedores alternativos en la red.",
                    ]
                },
                {
                    heading: "Panel de Visualización (Tu Plan):",
                    tasks: [
                        "Se mostrará tu Product Canvas, el Diagrama de Flujo del Proceso y la lista de activos y proveedores.",
                    ]
                },
                {
                    heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
                    tasks: [
                        "Información del Mundo Real: Costos promedio de maquinaria en el mercado. Benchmarks de eficiencia para tus procesos.",
                        "Recomendación: Sugerirá cuellos de botella potenciales en tu proceso productivo.",
                        "Ponderación (Eficiencia Operativa): Calificación de 1 a 10 de la viabilidad de tus operaciones.",
                    ]
                }
            ]
        },
        {
            title: "3.2 - Plan Financiero",
            items: [
                {
                    heading: "Panel de Aporte (Tu Información):",
                    tasks: [
                        "Campos: Introduce tus costos fijos, variables, inversión inicial y proyecciones de ventas.",
                        "Botón [Reescribir con IA]: Organiza tus datos financieros en tablas estandarizadas.",
                        "Botón [Calcular y Proyectar]: La IA generará automáticamente tus estados financieros proforma (Estado de Resultados, Flujo de Efectivo) y calculará los indicadores clave.",
                    ]
                },
                {
                    heading: "Panel de Visualización (Tu Plan):",
                    tasks: [
                        "Se mostrarán gráficos y tablas con tus proyecciones financieras, punto de equilibrio y rentabilidad.",
                    ]
                },
                {
                    heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
                    tasks: [
                        "Información del Mundo Real: Comparará tus proyecciones con los promedios de la industria. Analizará la viabilidad de tu punto de equilibrio.",
                        "Recomendación: Alertará sobre posibles problemas de liquidez o rentabilidad (ej. \"Tu margen de ganancia es 15% inferior al promedio del sector\").",
                        "Ponderación (Salud Financiera): Calificación de 1 a 10 sobre la viabilidad de tu plan financiero.",
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Pestaña 4: Ejecución y Gestión",
    value: "level-4",
    objective: "Convertir todos tus planes en acciones concretas y darles seguimiento.",
    checklists: [
        {
            title: "4.1 - Plan de Proyectos y Tareas",
            items: [
                {
                    heading: "Panel de Aporte (Tu Información):",
                    tasks: [
                        "Campo: Define un objetivo (ej. \"Lanzamiento en Redes Sociales\") y desglósalo en tareas. Asigna responsables y fechas límite.",
                        "Botón [Reescribir con IA]: Convierte tu lista de tareas en un cronograma SMART.",
                        "Botón [Sugerir Plan de Acción]: Basado en tus planes anteriores, la IA puede proponer un plan de proyecto completo para tus objetivos más importantes.",
                    ]
                },
                {
                    heading: "Panel de Visualización (Tu Plan):",
                    tasks: [
                        "Aquí verás el Cronograma de Proyectos (estilo Gantt) y la lista de Tareas Pendientes, todo integrado con el Panel Principal de la plataforma.",
                    ]
                },
                {
                    heading: "Panel de Análisis IA (Recomendaciones y Ponderación):",
                    tasks: [
                        "Información del Mundo Real: La IA puede identificar dependencias entre tareas que no habías notado.",
                        "Recomendación: Sugerirá hitos clave y alertará sobre posibles retrasos.",
                        "Ponderación (Viabilidad de Ejecución): Calificación de 1 a 10 sobre qué tan realista y bien estructurado está tu plan de ejecución.",
                    ]
                }
            ]
        }
    ]
  },
];

const ChecklistItem = ({ task, id }: { task: string; id: string }) => (
    <p className="text-sm text-foreground/90 leading-snug pl-6 relative before:content-['-'] before:absolute before:left-2">
        {task}
    </p>
);

export default function DevelopmentGuidePage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Guía Interactiva 'Emprendimientos Visionarios': Tu Ruta al Éxito"
                description="Este documento es tu manual de operaciones para construir un plan de negocio robusto utilizando la plataforma Emprendimientos Visionarios."
            />

            <Tabs defaultValue="level-1" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    {levels.map((level, index) => (
                        <TabsTrigger key={level.value} value={level.value}>
                            {`Pestaña ${index + 1}`}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {levels.map((level) => (
                    <TabsContent key={level.value} value={level.value}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">{level.level.split(':')[1].trim()}</CardTitle>
                                <CardDescription>{level.objective}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {level.checklists.map((checklist, checklistIndex) => (
                                    <div key={checklistIndex}>
                                        <h3 className="text-lg font-semibold mb-2">{checklist.title}</h3>
                                        {checklist.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="pl-4 border-l-2 border-border ml-2 mb-4">
                                                {item.heading && <h4 className="font-semibold text-base mb-2">{item.heading}</h4>}
                                                <div className="flex flex-col gap-1">
                                                    {item.tasks.map((task, taskIndex) => (
                                                        <ChecklistItem 
                                                            key={taskIndex}
                                                            task={task}
                                                            id={`l${level.value}-c${checklistIndex}-i${itemIndex}-t${taskIndex}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}

    