
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save, History, Redo, Undo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type PestelState = {
  politicos: string;
  economicos: string;
  sociales: string;
  tecnologicos: string;
  ecologicos: string;
  legales: string;
};

const pestelData: Record<string, PestelState> = {
    "cafe-aroma": {
        politicos: "- Acuerdos comerciales favorables para la exportación de café (Oportunidad).\n- Inestabilidad política en regiones cafetaleras puede afectar el suministro (Amenaza).",
        economicos: "- Aumento del poder adquisitivo de la clase media que busca productos premium (Oportunidad).\n- Inflación y aumento en costos de logística (Amenaza).\n- Volatilidad del tipo de cambio para compras de equipo importado (Amenaza).",
        sociales: "- Creciente interés en la cultura del café de especialidad y la preparación en casa (Oportunidad).\n- Tendencia hacia un consumo más consciente y ético (Oportunidad).\n- Cambios en los hábitos de consumo, prefiriendo la rapidez sobre la calidad (Amenaza).",
        tecnologicos: "- Nuevas plataformas de e-commerce y marketing digital facilitan el acceso a clientes (Oportunidad).\n- Mejoras en la tecnología de tostado para mayor consistencia (Oportunidad).\n- Necesidad de inversión constante para mantenerse tecnológicamente relevante (Amenaza).",
        ecologicos: "- Demanda por empaques sostenibles y biodegradables (Oportunidad).\n- El cambio climático afecta las cosechas y la calidad del grano (Amenaza).\n- Regulaciones ambientales más estrictas sobre el tratamiento de residuos del café (Amenaza).",
        legales: "- Normativas de etiquetado de alimentos más exigentes (Amenaza).\n- Leyes de protección al consumidor que regulan la publicidad (Amenaza).\n- Legislación laboral que aumenta los costos de personal (Amenaza)."
    },
    "restaurante-gambusinos": {
        politicos: "- Apoyos gubernamentales al turismo regional (Oportunidad).\n- Estabilidad política local que favorece la inversión (Oportunidad).",
        economicos: "- Crecimiento de la industria minera en la región, que trae trabajadores con poder adquisitivo (Oportunidad).\n- Inflación en el precio de los alimentos (Amenaza).",
        sociales: "- Revalorización de la cocina regional y tradicional (Oportunidad).\n- Aumento del turismo de fin de semana en la ruta del Río Sonora (Oportunidad).",
        tecnologicos: "- Uso de redes sociales para promoción a bajo costo (Oportunidad).\n- Sistemas de punto de venta en la nube para una mejor administración (Oportunidad).",
        ecologicos: "- Regulaciones sobre el manejo de residuos de restaurantes (Amenaza).\n- Creciente interés de los turistas en prácticas sostenibles (Oportunidad).",
        legales: "- Requisitos para la licencia de venta de alcohol (Amenaza).\n- Normas de salubridad y protección civil que deben cumplirse estrictamente (Amenaza)."
    },
    "ecoturismo-la-salina": {
        politicos: "- Buena relación con instituciones públicas (CONANP, CONAFOR).\n- Ubicación estratégica cerca de la frontera con EE.UU., facilitando el acceso a un mercado dolarizado.",
        economicos: "- Devaluación del peso frente al dólar hace el destino más atractivo para el turismo extranjero.\n- Polo de desarrollo turístico en Puerto Peñasco genera demanda complementaria.",
        sociales: "- Creciente interés en turismo de naturaleza, cultural y de conservación.\n- Valoración de experiencias auténticas y contacto con comunidades locales (Pápagos).",
        tecnologicos: "- Oportunidad de usar energía solar para la operación (paneles, bombas solares).\n- Uso de redes sociales y marketing digital para alcanzar nichos de mercado (académico, observadores de aves).",
        ecologicos: "- Ubicación dentro de la Reserva de la Biósfera es un atractivo central.\n- Riqueza de ecosistemas (mar-desierto), flora y fauna únicos.",
        legales: "- El proyecto está sujeto a las regulaciones y Plan de Manejo de la Reserva del Alto Golfo.\n- Necesidad de permisos específicos para construcción y operación en un área natural protegida."
    },
    "taller-carroceria": {
        politicos: "- Programas gubernamentales de apoyo a PyMEs (Oportunidad).\n- Regulaciones ambientales más estrictas sobre el manejo de solventes y pinturas (Amenaza).",
        economicos: "- Inestabilidad económica puede reducir el gasto discrecional en reparaciones estéticas (Amenaza).\n- El aumento del parque vehicular en la ciudad incrementa el mercado potencial (Oportunidad).",
        sociales: "- Tendencia a conservar los vehículos por más tiempo en lugar de comprar nuevos (Oportunidad).\n- Valoración de la apariencia del vehículo como símbolo de estatus (Oportunidad).",
        tecnologicos: "- Nuevas tecnologías en pintura y materiales de reparación que mejoran la calidad y eficiencia (Oportunidad).\n- Necesidad de inversión y capacitación constante para usar nuevas herramientas y técnicas (Amenaza).",
        ecologicos: "- Exigencia de un manejo adecuado de residuos tóxicos (Amenaza).\n- Oportunidad de usar productos y pinturas con base de agua, más ecológicos, como diferenciador.",
        legales: "- Requisitos de protección civil y permisos de operación municipal (Amenaza).\n- Normas sobre garantías en servicios de reparación que deben cumplirse (Amenaza)."
    }
};

export default function PestelPage() {
    const [selectedProject, setSelectedProject] = useState("cafe-aroma");
    const [pestel, setPestel] = useState<PestelState>(pestelData[selectedProject]);

    const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setPestel(pestelData[projectId] || { politicos: '', economicos: '', sociales: '', tecnologicos: '', ecologicos: '', legales: '' });
    };

    const handleSave = () => {
        console.log("Guardando análisis PESTEL:", pestel);
        alert("Análisis PESTEL guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                 <div className="flex-grow">
                     <PageHeader
                        title="Análisis PESTEL"
                        description="Identifica los factores del macroentorno que pueden impactar tu negocio."
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
                    <CardTitle>Lienzo PESTEL</CardTitle>
                    <CardDescription>Analiza cada una de las seis áreas para identificar oportunidades y amenazas clave.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="politicos" className="text-lg font-semibold">Políticos</Label>
                        <Textarea id="politicos" value={pestel.politicos} onChange={createChangeHandler(setPestel, 'politicos')} placeholder="Leyes, políticas fiscales, estabilidad..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="economicos" className="text-lg font-semibold">Económicos</Label>
                        <Textarea id="economicos" value={pestel.economicos} onChange={createChangeHandler(setPestel, 'economicos')} placeholder="Crecimiento, inflación, tasas de interés..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sociales" className="text-lg font-semibold">Sociales</Label>
                        <Textarea id="sociales" value={pestel.sociales} onChange={createChangeHandler(setPestel, 'sociales')} placeholder="Tendencias, demografía, estilos de vida..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="tecnologicos" className="text-lg font-semibold">Tecnológicos</Label>
                        <Textarea id="tecnologicos" value={pestel.tecnologicos} onChange={createChangeHandler(setPestel, 'tecnologicos')} placeholder="Innovaciones, automatización, I+D..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ecologicos" className="text-lg font-semibold">Ecológicos</Label>
                        <Textarea id="ecologicos" value={pestel.ecologicos} onChange={createChangeHandler(setPestel, 'ecologicos')} placeholder="Leyes ambientales, cambio climático..." rows={6}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="legales" className="text-lg font-semibold">Legales</Label>
                        <Textarea id="legales" value={pestel.legales} onChange={createChangeHandler(setPestel, 'legales')} placeholder="Leyes de protección al consumidor, normativas laborales..." rows={6}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
