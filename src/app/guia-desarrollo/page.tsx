
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const levels = [
  {
    level: "Nivel 1: El Entorno",
    value: "level-1",
    objective: "Comprender el terreno donde vas a competir antes de lanzar tu producto.",
    checklists: [
      {
        title: "Checklist de Análisis Externo",
        items: [
          {
            heading: "1. Análisis del Macroentorno (PESTEL - Opcional para inicio)",
            tasks: [
              "Político: ¿Hay leyes o regulaciones que te afecten?",
              "Económico: ¿Cómo está la economía de tus clientes?",
              "Social: ¿Qué tendencias culturales o de estilo de vida benefician tu idea?",
              "Tecnológico: ¿Qué tecnologías puedes usar a tu favor?",
            ],
          },
          {
            heading: "2. Análisis del Microentorno (Mercado y Competencia)",
            tasks: [
              "Tamaño y Potencial del Mercado: ¿Cuántos clientes potenciales existen? (Ej. CAAM RAYON calculó la demanda potencial de adultos mayores en Hermosillo).",
              "Segmentación de Clientes: Define los grupos de clientes a los que te dirigirás.",
              "Análisis de la Competencia: Identifica 3-5 competidores. Analiza sus precios, productos y estrategias.",
              "Buyer Persona: Crea un perfil detallado de tu cliente ideal (nombre, edad, motivaciones, frustraciones).",
            ],
          },
          {
            heading: "3. Análisis Interno (FODA)",
            tasks: [
                "Fortalezas: ¿Qué haces mejor que nadie?",
                "Debilidades: ¿En qué necesitas mejorar internamente?",
                "Oportunidades: ¿Qué factores del mercado puedes aprovechar?",
                "Amenazas: ¿Qué factores externos podrían perjudicarte?",
            ],
          },
        ],
      },
    ],
  },
  {
    level: "Nivel 2: La Estrategia",
    value: "level-2",
    objective: "Crear el mapa maestro que conecta tu idea con el mercado.",
    checklists: [
        {
            title: "Checklist de Componentes Estratégicos",
            items: [
                {
                    heading: "1. Identidad y Dirección",
                    tasks: [
                        "Misión: Tu propósito.",
                        "Vision: Tu meta a largo plazo.",
                        "Valores: Tus principios guía.",
                        "Objetivos SMART: Metas Específicas, Medibles, Alcanzables, Relevantes y con Plazo.",
                    ]
                },
                {
                    heading: "2. Modelo de Negocio (Business Model Canvas)",
                    tasks: [
                        "Propuesta de Valor: ¿Qué ofreces y por qué es único?",
                        "Segmentos de Clientes: ¿A quién te diriges?",
                        "Canales: ¿Cómo llegarás a tus clientes?",
                        "Relación con Clientes: ¿Cómo interactuarás con ellos?",
                        "Fuentes de Ingresos: ¿Cómo ganarás dinero?",
                        "Actividades Clave: ¿Qué es lo más importante que harás?",
                        "Recursos Clave: ¿Qué necesitas para operar?",
                        "Socios Clave: ¿Quiénes son tus aliados?",
                        "Estructura de Costos: ¿Cuáles son tus principales gastos?",
                    ]
                },
                 {
                    heading: "3. Estrategia de Marketing y Ventas",
                    tasks: [
                        "Estrategia de Producto: Características, calidad, empaque.",
                        "Estrategia de Precio: Basada en costos, competencia y valor percibido.",
                        "Estrategia de Plaza (Distribución): Canales de venta (online, físico).",
                        "Estrategia de Promoción: Publicidad, redes sociales, relaciones públicas.",
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Nivel 3: La Táctica",
    value: "level-3",
    objective: "Detallar el \"cómo\" de cada área funcional para hacer realidad la estrategia.",
    checklists: [
        {
            title: "Checklist de Planes Tácticos",
            items: [
                {
                    heading: "1. Plan de Operaciones (Producto)",
                    tasks: [
                        "Diagrama de Flujo del Proceso: Mapea cada paso desde la materia prima hasta la entrega.",
                        "Listado de Activos Fijos: Tabla con maquinaria, equipo, costo y vida útil.",
                        "Gestión de Proveedores: Lista de proveedores y cotizaciones.",
                        "Control de Calidad: Define los estándares y puntos de revisión.",
                    ]
                },
                {
                    heading: "2. Plan de Organización (Personas)",
                    tasks: [
                        "Organigrama: Dibuja la estructura del equipo.",
                        "Perfiles de Puesto: Describe las responsabilidades y requisitos de cada rol.",
                        "Plan de Contratación: Define qué puestos necesitas cubrir y cuándo.",
                    ]
                },
                 {
                    heading: "3. Plan Financiero (Dinero)",
                    tasks: [
                        "Estructura de Costos: Hojas de cálculo detalladas de costos fijos y variables.",
                        "Proyecciones de Ventas: Estimación de ingresos mensuales para los primeros 3 años.",
                        "Estados Financieros Proforma: Estado de Resultados, Flujo de Efectivo y Balance General proyectados.",
                        "Análisis de Rentabilidad: Cálculo del Punto de Equilibrio, ROI y VAN.",
                    ]
                }
            ]
        }
    ]
  },
  {
    level: "Nivel 4: La Ejecución",
    value: "level-4",
    objective: "Convertir los planes tácticos en acciones concretas y medibles.",
    checklists: [
        {
            title: "Checklist del Plan de Proyecto",
            items: [
                {
                    heading: null,
                    tasks: [
                        'Definir un Objetivo Concreto: Elige una meta de tus planes funcionales (ej. "Lanzar campaña de marketing digital para el Día de la Madre").',
                        "Desglosar en Tareas: Lista todas las actividades necesarias (diseñar gráficos, escribir textos, programar publicaciones, asignar presupuesto, etc.).",
                        "Crear un Cronograma: Usa una tabla o diagrama de Gantt para asignar fechas de inicio y fin a cada tarea.",
                        "Asignar Responsables: Define quién se encargará de cada tarea.",
                        "Definir Presupuesto: Estima el costo asociado a la ejecución de ese proyecto específico.",
                        'Métricas de Éxito (KPIs): ¿Cómo medirás si el proyecto fue exitoso? (ej. "Aumentar las ventas online en un 20% durante el mes de mayo").',
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
                title="Guía de Desarrollo: Puntos Clave para tu Plan de Negocio"
                description="Usa esta guía como tu checklist interactiva para asegurarte de que no te falte ningún elemento crucial en tu planificación."
            />

            <Tabs defaultValue="level-1" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
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
