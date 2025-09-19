"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PageHeader from "@/components/page-header";

const sections = [
    {
        value: "item-1",
        title: "1. Resumen Ejecutivo",
        intro: "Es la sección más importante. Una síntesis de 1-2 páginas de todos los puntos clave. Aunque va al principio, se escribe al final.",
        questions: [
            "¿Qué es la empresa y qué hace?",
            "¿Qué problema resuelve?",
            "¿Quiénes son sus clientes?",
            "¿Quién está detrás del proyecto?",
            "¿Cuáles son los puntos financieros más destacados (ventas proyectadas, rentabilidad)?",
            "¿Cuánto financiamiento se necesita y para qué se usará?",
        ],
    },
    {
        value: "item-2",
        title: "2. Descripción de la Empresa",
        intro: "La carta de presentación formal de tu negocio. Aquí se detalla la idea general, la misión, la visión y los objetivos.",
        questions: [
            "¿Cuál es la misión (el propósito) y la visión (a dónde quiere llegar) de la empresa?",
            "¿Cuál es su estructura legal (Persona Física con Actividad Empresarial, S.A.S., S.A. de C.V., etc.)?",
            "¿En qué etapa se encuentra el negocio (idea, startup, en operación)?",
            "¿Cuáles son las ventajas competitivas clave?",
        ],
    },
    {
        value: "item-3",
        title: "3. Análisis de Mercado",
        intro: "La evidencia de que existe una oportunidad real para tu negocio. Demuestra que entiendes la industria, tus clientes y tu competencia.",
        questions: [
            "Industria: ¿Qué tan grande es el mercado? ¿Está creciendo o disminuyendo? ¿Cuáles son las tendencias actuales?",
            "Cliente Ideal (Target Market): ¿Quiénes son tus clientes? (Demografía, comportamiento, necesidades).",
            "Competencia: ¿Quiénes son tus competidores directos e indirectos? ¿Qué hacen bien y qué hacen mal (tu oportunidad)?",
            "Análisis FODA: ¿Cuáles son las Fortalezas, Oportunidades, Debilidades y Amenazas de tu proyecto en este mercado?",
        ],
    },
    {
        value: "item-4",
        title: "4. Organización y Gestión",
        intro: "Un negocio es tan bueno como el equipo que lo dirige. Esta sección presenta a las personas clave detrás del proyecto.",
        questions: [
            "¿Quiénes forman el equipo directivo y qué experiencia relevante tienen?",
            "¿Cuál es la estructura organizativa (organigrama)?",
            "¿Qué roles y responsabilidades tiene cada miembro del equipo?",
            "¿Se necesita contratar personal clave en el futuro?",
        ],
    },
    {
        value: "item-5",
        title: "5. Productos o Servicios",
        intro: "Aquí se describe en detalle lo que vendes.",
        questions: [
            "¿Qué producto o servicio ofreces? ¿Cómo funciona?",
            "¿Qué lo hace único o mejor que las alternativas existentes? (Propuesta Única de Valor).",
            "¿Cómo está protegido (patentes, marcas registradas, derechos de autor)?",
            "¿Cuál es el ciclo de vida del producto? ¿Hay planes para futuros productos o versiones?",
        ],
    },
    {
        value: "item-6",
        title: "6. Estrategia de Marketing y Ventas",
        intro: "Es el plan de acción para llegar a tus clientes y convencerlos de comprar.",
        questions: [
            "Marketing (Cómo te conocerán): ¿Qué canales usarás para llegar a tu público objetivo (redes sociales, SEO, publicidad online, etc.)?",
            "Ventas (Cómo comprarán): ¿Cuál será tu proceso de ventas (tienda en línea, equipo de ventas directas, distribuidores)?",
            "Precio: ¿Cuál es tu estrategia de precios y por qué?",
            "Posicionamiento: ¿Cómo quieres que los clientes perciban tu marca?",
        ],
    },
    {
        value: "item-7",
        title: "7. Plan Financiero",
        intro: "Son los números que respaldan todo lo dicho anteriormente. Es la sección más examinada por los inversores. Esta sección se cubre en profundidad en nuestra pestaña de 'Finanzas'.",
        questions: [
            "Proyecciones Financieras: ¿Cuáles son tus pronósticos de ingresos, costos y gastos para los próximos 3 a 5 años?",
            "Análisis de Punto de Equilibrio: ¿Cuánto necesitas vender para empezar a ser rentable?",
            "Requerimiento de Financiamiento: Si buscas inversión, ¿cuánto dinero necesitas, en qué lo vas a usar y qué ofreces a cambio?",
            "Supuestos Clave: ¿Cuáles son las suposiciones más importantes en las que se basan tus proyecciones?",
        ],
    },
];

export default function GuiaPlanNegociosPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Estructura Fundamental del Plan de Negocios"
        description="Tu hoja de ruta para un proyecto exitoso. Usa esta guía como referencia al completar las secciones de tu plan."
      />
      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => (
              <AccordionItem value={section.value} key={section.value}>
                <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                  <p className="lead">{section.intro}</p>
                  <h4>Preguntas que responde:</h4>
                  <ul>
                    {section.questions.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}