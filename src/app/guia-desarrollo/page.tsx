
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const levels = [
  {
    level: "Nivel 0: Validación de la Idea",
    value: "level-0",
    objective: "Contestar rápidamente a la pregunta: ¿Esta idea tiene potencial?",
    checklists: [
      {
        title: "Checklist del Estudio de Viabilidad",
        items: [
          {
            heading: "1. Viabilidad de Mercado",
            tasks: [
              "Definir el Problema: Escribe en una frase el problema que tu producto/servicio resuelve.",
              "Cliente Potencial: Describe a tu cliente ideal en 3-5 características (edad, intereses, necesidades).",
              "Competencia Inicial: Identifica 2 o 3 competidores y anota sus precios.",
              "Demanda Estimada (Simple): Entrevista a 10 personas que encajen en tu perfil de cliente y pregunta si comprarían tu producto y a qué precio.",
            ],
          },
          {
            heading: "2. Viabilidad Técnica/Operativa",
            tasks: [
              "Habilidades Clave: Haz una lista de las habilidades que tú o tu equipo ya poseen para crear el producto (ej. 'Experiencia en repostería', 'Habilidad para el diseño visual').",
              "Recursos Mínimos: Lista el equipo y los materiales absolutamente esenciales para empezar.",
              "Proceso Básico: Dibuja un diagrama simple con 3-5 pasos que describan cómo crearás tu producto o servicio.",
            ],
          },
          {
            heading: "3. Viabilidad Financiera (Preliminar)",
            tasks: [
                "Costo por Producto: Calcula el costo de la materia prima para una sola unidad.",
                "Precio Tentativo: Establece un precio de venta inicial basándote en la competencia y tu costo.",
                "Ganancia Bruta: Resta el costo de la materia prima de tu precio de venta. ¿El resultado es positivo y atractivo?",
            ],
          },
        ],
      },
    ],
  },
  {
    level: "Nivel 1: Dirección Estratégica",
    value: "level-1",
    objective: "Crear la brújula que guiará tu negocio.",
    checklists: [
        {
            title: "Checklist del Plan Estratégico Simplificado",
            items: [
                {
                    heading: "1. Identidad de la Marca",
                    tasks: [
                        "Misión: Escribe una declaración de tu propósito.",
                        "Visión: Escribe a dónde quieres llegar en 3-5 años.",
                        "Valores: Elige 3 a 5 palabras que definan tu cultura (ej. Calidad, Creatividad, Compromiso)."
                    ]
                },
                {
                    heading: "2. Análisis FODA",
                    tasks: [
                        "Fortalezas: Lista al menos 3 ventajas internas.",
                        "Oportunidades: Lista al menos 3 factores externos que puedes aprovechar.",
                        "Debilidades: Lista al menos 3 áreas internas a mejorar.",
                        "Amenazas: Lista al menos 3 factores externos que podrían perjudicarte.",
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Nivel 2: El Plan de Negocios Integral",
    value: "level-2",
    objective: "Desarrollar el documento maestro que presentarás a bancos, socios o inversionistas.",
    checklists: [
        {
            title: "Checklist de Secciones del Plan de Negocios",
            items: [
                {
                    heading: null,
                    tasks: [
                        "Resumen Ejecutivo: (Escribir al final) Resumen atractivo de los puntos más importantes.",
                        "Descripción de la Empresa: Detalla la historia, la forma legal y los objetivos SMART.",
                        "Análisis de Mercado: Profundiza en el tamaño del mercado, perfil del cliente (Buyer Persona), tendencias y un análisis competitivo detallado.",
                        "Organización y Gestión: Incluye un organigrama y una descripción de los perfiles y funciones de cada puesto clave.",
                        "Productos y Servicios: Describe cada producto con especificaciones técnicas, ciclo de vida y ventajas competitivas.",
                        "Estrategia de Marketing y Ventas: Detalla las 4 P's (Producto, Precio, Plaza, Promoción) y los canales que usarás.",
                        "Estudio Técnico / Plan de Operaciones: Describe el proceso productivo con diagramas de flujo, lista de maquinaria y proveedores.",
                        "Plan Financiero: Proyecciones financieras completas a 3-5 años (inversión inicial, costos, proyecciones de ventas, flujo de efectivo, rentabilidad)."
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Nivel 3: Los Planes Funcionales (El Detalle)",
    value: "level-3",
    objective: "Crear guías de acción específicas para cada área de tu negocio.",
    checklists: [
        {
            title: "Checklist de Planes Funcionales",
            items: [
                {
                    heading: "1. Plan de Marketing",
                    tasks: [
                        'Objetivos de Marketing: (ej. "Aumentar seguidores en Instagram en un 50% en 6 meses").',
                        "Buyer Persona Detallado: Crea un perfil completo con demografía, metas, frustraciones y motivaciones.",
                        "Calendario de Contenidos: Planifica los temas y la frecuencia de tus publicaciones.",
                        "Presupuesto de Publicidad: Asigna una cantidad mensual para anuncios.",
                    ]
                },
                {
                    heading: "2. Plan de Operaciones",
                    tasks: [
                        "Diagrama de Flujo Detallado: Mapea cada paso del proceso, incluyendo controles de calidad.",
                        "Listado de Activos Fijos: Tabla con toda la maquinaria, su costo y vida útil estimada.",
                        "Gestión de Proveedores: Lista de al menos dos proveedores por cada materia prima clave, con cotizaciones.",
                        "Diseño del Espacio (Layout): Dibuja un plano de tu área de trabajo para optimizar el flujo."
                    ]
                },
                 {
                    heading: "3. Plan Financiero",
                    tasks: [
                        "Tablas de Costos: Crea hojas de cálculo separadas para costos variables y costos fijos mensuales.",
                        "Cálculo de Depreciación: Calcula el desgaste mensual de tu equipo.",
                        "Estados Financieros Proforma: Desarrolla el Estado de Resultados y el Flujo de Efectivo proyectados a 3 años.",
                        "Análisis de Rentabilidad: Calcula el Punto de Equilibrio, el Retorno de la Inversión (ROI) y el Valor Actual Neto (VAN) si buscas inversión."
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Nivel 4: La Ejecución",
    value: "level-4",
    objective: "Convertir un plan en un conjunto de tareas realizables.",
    checklists: [
        {
            title: "Checklist del Plan de Proyecto",
            items: [
                {
                    heading: null,
                    tasks: [
                        'Definir un Objetivo Concreto: Elige una meta de tus planes funcionales (ej. "Obtener el permiso sanitario").',
                        "Desglosar en Tareas: Lista todas las actividades necesarias para lograr ese objetivo.",
                        "Crear un Cronograma: Usa una tabla o un diagrama de Gantt simple para asignar fechas de inicio y fin a cada tarea.",
                        "Asignar Responsables: Define quién se encargará de cada tarea.",
                        "Definir Presupuesto: Estima el costo asociado a la ejecución de ese proyecto específico."
                    ]
                }
            ]
        }
    ]
  },
];

const ChecklistItem = ({ task, id }: { task: string; id: string }) => (
    <div className="flex items-center space-x-3 py-2">
        <Checkbox id={id} />
        <Label htmlFor={id} className="text-sm font-normal text-foreground/90 leading-snug">
            {task}
        </Label>
    </div>
);

export default function DevelopmentGuidePage() {
    return (
        <div className="space-y-8">
            <PageHeader
                title="Guía de Desarrollo: Puntos Clave para tu Plan"
                description="Usa esta guía como tu checklist interactiva para asegurarte de que no te falte ningún elemento crucial en tu planificación."
            />

            <Tabs defaultValue="level-0" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {levels.map((level) => (
                        <TabsTrigger key={level.value} value={level.value}>
                            {level.level.split(':')[0]}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {levels.map((level, levelIndex) => (
                    <TabsContent key={level.value} value={level.value}>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl text-primary">{level.level}</CardTitle>
                                <CardDescription>{level.objective}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {level.checklists.map((checklist, checklistIndex) => (
                                    <div key={checklistIndex}>
                                        <h3 className="text-lg font-semibold mb-2">{checklist.title}</h3>
                                        {checklist.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="pl-4 border-l-2 border-border ml-2 mb-4">
                                                {item.heading && <h4 className="font-semibold text-base mb-2">{item.heading}</h4>}
                                                <div className="flex flex-col">
                                                    {item.tasks.map((task, taskIndex) => (
                                                        <ChecklistItem 
                                                            key={taskIndex}
                                                            task={task}
                                                            id={`l${levelIndex}-c${checklistIndex}-i${itemIndex}-t${taskIndex}`}
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
