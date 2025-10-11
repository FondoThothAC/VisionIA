
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
        amenazas: "- Clima extremo en invierno y verano.\n- Desconocimiento general del público sobre la existencia de estos atractivos.\n- Falta de cultura sobre el cuidado de la naturaleza por parte de algunos visitantes."
    }
};


export default function FodaPage() {
    const [selectedProject, setSelectedProject] = useState("cafe-aroma");
    const [foda, setFoda] = useState<FodaState>(fodaData[selectedProject]);

    const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setFoda(fodaData[projectId] || { fortalezas: '', oportunidades: '', debilidades: '', amenazas: '' });
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
