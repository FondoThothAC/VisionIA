
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save, History, Undo, Redo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FodaState = {
  fortalezas: string;
  oportunidades: string;
  debilidades: string;
  amenazas: string;
};

const fodaData: Record<string, FodaState> = {
    "cafe-aroma": {
        fortalezas: "- Equipo con experiencia en la industria del café.\n- Relación directa con productores de alta calidad.\n- Marca con historia y propósito (storytelling).",
        oportunidades: "- Crecimiento del mercado de café de especialidad.\n- Aumento del consumo de productos éticos y sostenibles.\n- Posibilidad de exportación a mercados internacionales.",
        debilidades: "- Capital de trabajo limitado para grandes inventarios.\n- Poca experiencia en marketing digital a gran escala.\n- Dependencia de un número reducido de fincas proveedoras.",
        amenazas: "- Volatilidad en los precios del café verde.\n- Aparición de nuevas marcas competidoras con mayor presupuesto.\n- Cambios en las regulaciones de importación/exportación."
    },
    "restaurante-gambusinos": {
        fortalezas: "- Concepto de Restaurant-Bar único en la región.\n- Ubicación céntrica y de alta afluencia en Aconchi.\n- Oferta gastronómica basada en la cocina regional popular.",
        oportunidades: "- Demanda de servicios de restaurante insatisfecha en el municipio.\n- Turismo constante por atractivos como las aguas termales.\n- Mercado de trabajadores de la minería con poder adquisitivo.",
        debilidades: "- La sociedad propietaria tiene experiencia limitada en la gestión directa de restaurantes.\n- El éxito depende de estandarizar procesos y recetas desde el día uno.\n- El formato de bar podría disuadir a una parte del público familiar en ciertos horarios.",
        amenazas: "- Competencia de otros establecimientos de comida en la región aunque no tengan el mismo concepto.\n- Dependencia del flujo turístico que puede ser estacional.\n- Aumento en el costo de los insumos y materias primas regionales."
    },
    "ecoturismo-la-salina": {
        fortalezas: "- Atractivos naturales únicos (desierto y mar).\n- Conocimiento profundo del área por parte de los ejidatarios.\n- Apoyo y relación con instituciones como CONANP y CONAFOR.\n- Riqueza histórica y cultural (asentamientos Pápago).",
        oportunidades: "- Cercanía a la frontera con EE.UU. (mercado de Arizona).\n- Aumento del interés en ecoturismo y experiencias auténticas.\n- Devaluación del peso abarata servicios para turistas extranjeros.\n- Infraestructura carretera recién inaugurada (Carretera Costera).",
        debilidades: "- Infraestructura de servicios básicos (agua, luz) muy pobre o inexistente.\n- Falta de capital para inversión inicial fuerte.\n- Poca experiencia en la industria del turismo y gestión de negocios.\n- Residencia de ejidatarios fuera del territorio del proyecto.",
        amenazas: "- Clima extremo en invierno y en verano.\n- Desconocimiento general del público sobre la existencia de estos atractivos.\n- Falta de cultura sobre el cuidado de la naturaleza por parte de algunos visitantes."
    },
    "taller-carroceria": {
        fortalezas: "- Más de 10 años de experiencia de los integrantes en el servicio de carrocería y pintura.\n- Enfoque en la atención personalizada y seguimiento post-servicio para generar confianza.\n- Estrategia de precios competitivos, manteniéndose por debajo de la competencia directa.",
        oportunidades: "- Mercado constante debido a daños por accidentes o desgaste natural de los vehículos.\n- Posibilidad de captar clientes que buscan calidad a un precio económico.\n- El incremento en el valor de reventa de un auto bien cuidado es un buen argumento de venta.",
        debilidades: "- El taller necesita remodelación y equipamiento nuevo.\n- Ubicación no céntrica, dependiendo de vías de acceso principales como el Blvd. Solidaridad.\n- Es una empresa nueva que compite contra talleres ya establecidos y con experiencia en el mercado.",
        amenazas: "- Competencia fuerte con empresas ya instaladas y con mayor equipamiento.\n- Aumento constante en el precio de los materiales (pintura, thinner, bondo).\n- Percepción del cliente de que un precio más bajo podría significar menor calidad."
    },
    "pizzeria-siglo-xxi": {
        fortalezas: "- Emplea a personas con síndrome de Down, lo que lo hace único y destacado en el mercado.\n- Ofrece productos de alta calidad y un servicio amable y acogedor.\n- Promueve una sensación de comunidad y pertenencia para las personas con síndrome de Down y sus familias.",
        oportunidades: "- Hay una creciente conciencia sobre la inclusión y la diversidad en la sociedad.\n- Puede expandirse a través de la apertura de nuevas sucursales o mediante la franquicia del modelo.\n- Puede colaborar con organizaciones y empresas locales para aumentar la visibilidad y el alcance del negocio.",
        debilidades: "- El proceso de capacitación puede llevar tiempo y esfuerzo adicional.\n- Puede haber cierta resistencia por parte de algunos clientes hacia la inclusión de personas con síndrome de Down en roles de trabajo.\n- El enfoque en la capacitación y la inclusión puede requerir recursos adicionales.",
        amenazas: "- La competencia en el mercado de alimentos puede ser alta.\n- Las regulaciones y los requisitos gubernamentales pueden ser más estrictos para las empresas que emplean a personas con discapacidades.\n- Puede haber una percepción errónea de que la calidad del producto se ve afectada."
    },
    "papeleria-la-sirena": {
        fortalezas: "- Experiencia por parte de los integrantes en la comercialización.\n- Punto de venta establecido en una ubicación viable.",
        oportunidades: "- La competencia es escasa y se encuentra a una distancia retirada.\n- Demanda considerable debido a la existencia de siete planteles educativos en la comunidad.",
        debilidades: "- Falta de capital para la inversión inicial.\n- La necesidad de trasladarse 107 km a Hermosillo para abastecerse de los proveedores mayoristas.",
        amenazas: "- Variación en el costo de los productos.\n- El surgimiento de más competencia en el futuro."
    },
     "cocina-economica": {
        fortalezas: "- Disponibilidad de mano de obra con experiencia en elaboración de alimentos y trato al cliente.\n- Precios accesibles para todo tipo de bolsillo.\n- Alimentación saludable y variedad de productos.",
        oportunidades: "- Cercanía a la mina 'La Caridad de Nacozari'.\n- Ubicación en los accesos a la mina.\n- Gran población minera en la región con demanda constante de alimentos.",
        debilidades: "- Falta de recursos para invertir.\n- Falta de prestigio por ser un negocio de apertura.",
        amenazas: "- Variación en el precio de los ingredientes.\n- Tendencia de la comunidad a consumir comida chatarra."
    },
    "restaurante-mariscos": {
        fortalezas: "- Acceso a mariscos y pescados frescos directamente de los pescadores locales.\n- Atractivos turísticos y paisajes en la comunidad que atraen clientes potenciales.\n- Mano de obra disponible con experiencia en el trato a turistas.",
        oportunidades: "- Demanda insatisfecha de restaurantes en la región de Bahía del Tobari.\n- Cercanía a la carretera costera, facilitando el acceso a turistas.\n- Oportunidad de incrementar la actividad económica y generar empleo local.",
        debilidades: "- Falta de recursos iniciales para invertir.\n- Infraestructura deficiente en la región.",
        amenazas: "- Clima adverso en temporada de ciclones y huracanes.\n- Malas condiciones en tramos de la carretera que pueden desincentivar al turismo.\n- Estacionalidad en el consumo de mariscos (veda)."
    }
};


export default function FodaPage() {
    const [selectedProject, setSelectedProject] = useState("cafe-aroma");
    const [foda, setFoda] = useState<FodaState>(fodaData[selectedProject]);

    const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setFoda(fodaData[projectId as keyof typeof fodaData] || { fortalezas: '', oportunidades: '', debilidades: '', amenazas: '' });
    };

    const handleSave = () => {
        console.log("Guardando análisis FODA:", foda);
        alert("Análisis FODA guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-grow">
                     <PageHeader
                        title="Análisis FODA"
                        description="Evalúa las Fortalezas, Oportunidades, Debilidades y Amenazas de tu negocio."
                        projectSelector={
                           <Select value={selectedProject} onValueChange={handleProjectChange}>
                              <SelectTrigger className="w-auto border-none shadow-none text-xl font-bold p-0 focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cafe-aroma">Proyecto: Café 'Aroma de Montaña'</SelectItem>
                                <SelectItem value="restaurante-gambusinos">Proyecto: Restaurant-Bar "Gambusinos"</SelectItem>
                                <SelectItem value="ecoturismo-la-salina">Proyecto: Campo Ecoturístico La Salina</SelectItem>
                                <SelectItem value="taller-carroceria">Proyecto: Taller de Carrocería y Pintura</SelectItem>
                                <SelectItem value="pizzeria-siglo-xxi">Proyecto: Pizzería Siglo XXI</SelectItem>
                                <SelectItem value="papeleria-la-sirena">Proyecto: Papelería La Sirena</SelectItem>
                                <SelectItem value="cocina-economica">Proyecto: Cocina Económica Nacozari</SelectItem>
                                <SelectItem value="restaurante-mariscos">Proyecto: Restaurante de Mariscos</SelectItem>
                              </SelectContent>
                            </Select>
                        }
                        author="Roberto"
                        aiModel={
                             <Select defaultValue="phi-4-mini">
                                <SelectTrigger className="w-auto border-none shadow-none focus:ring-0">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="phi-4-mini">Phi 4 Mini</SelectItem>
                                    <SelectItem value="llama-3">Llama 3</SelectItem>
                                    <SelectItem value="gemini-1.5">Gemini 1.5</SelectItem>
                                </SelectContent>
                            </Select>
                        }
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Undo/></Button>
                    <Button variant="ghost" size="icon"><Redo/></Button>
                    <Button variant="outline"><History className="mr-2"/> Historial</Button>
                    <Button onClick={handleSave}>
                        <Save className="mr-2"/>
                        Guardar Progreso
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lienzo FODA</CardTitle>
                    <CardDescription>Rellena cada cuadrante para obtener una visión completa de tu posición estratégica.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 p-4 bg-green-50 rounded-lg border border-green-200">
                        <Label htmlFor="fortalezas" className="text-lg font-semibold text-green-800">Fortalezas (Interno, Positivo)</Label>
                        <Textarea id="fortalezas" value={foda.fortalezas} onChange={createChangeHandler(setFoda, 'fortalezas')} placeholder="¿En qué eres bueno? ¿Qué ventajas tienes?" rows={8} className="bg-white"/>
                    </div>
                    <div className="space-y-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <Label htmlFor="oportunidades" className="text-lg font-semibold text-blue-800">Oportunidades (Externo, Positivo)</Label>
                        <Textarea id="oportunidades" value={foda.oportunidades} onChange={createChangeHandler(setFoda, 'oportunidades')} placeholder="¿Qué tendencias del mercado puedes aprovechar? ¿Qué cambios tecnológicos te benefician?" rows={8} className="bg-white"/>
                    </div>
                    <div className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-200">
                        <Label htmlFor="debilidades" className="text-lg font-semibold text-red-800">Debilidades (Interno, Negativo)</Label>
                        <Textarea id="debilidades" value={foda.debilidades} onChange={createChangeHandler(setFoda, 'debilidades')} placeholder="¿En qué podrías mejorar? ¿Qué recursos te faltan?" rows={8} className="bg-white"/>
                    </div>
                    <div className="space-y-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <Label htmlFor="amenazas" className="text-lg font-semibold text-amber-800">Amenazas (Externo, Negativo)</Label>
                        <Textarea id="amenazas" value={foda.amenazas} onChange={createChangeHandler(setFoda, 'amenazas')} placeholder="¿Qué obstáculos enfrentas? ¿Qué hace tu competencia?" rows={8} className="bg-white"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
