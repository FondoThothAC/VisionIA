
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save, History, Redo, Undo } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ServiceFlowerState = {
  informacion: string;
  consulta: string;
  tomaPedidos: string;
  hospitalidad: string;
  cuidadoPertenencias: string;
  excepciones: string;
  facturacion: string;
  pago: string;
};

const serviceFlowerData: Record<string, ServiceFlowerState> = {
    "cafe-aroma": {
        informacion: "- Página web con detalles de cada café, origen y notas de sabor.\n- Guías de preparación en el blog.\n- FAQ con información de envíos y suscripciones.",
        consulta: "- Chat en vivo en el sitio web para resolver dudas sobre el mejor café para su gusto.\n- Consultoría por email para clientes B2B (cafeterías).",
        tomaPedidos: "- Carrito de compras online 24/7.\n- Proceso de suscripción automatizado.\n- Pedidos vía WhatsApp para clientes locales.",
        hospitalidad: "- Email de bienvenida personalizado al crear una cuenta.\n- Nota de agradecimiento escrita a mano en cada primer pedido.\n- Ambiente acogedor en futuros talleres de catación.",
        cuidadoPertenencias: "- Empaque seguro y robusto para proteger el café durante el envío.\n- Envoltura para regalo disponible como opción.",
        excepciones: "- Política de devolución clara si el café llega dañado.\n- Flexibilidad para pausar o cambiar la suscripción mensual.\n- Atención a peticiones especiales (ej. un molido específico).",
        facturacion: "- Factura automática enviada por email tras la compra.\n- Resumen claro y mensual de los cargos de suscripción.",
        pago: "- Aceptamos tarjetas de crédito/débito (Stripe), PayPal y transferencias bancarias (SPEI)."
    },
    "restaurante-gambusinos": {
        informacion: "- Menú visible fuera del local.\n- Página de Facebook con fotos de platillos, horarios y ubicación.\n- Promociones anunciadas en pizarras.",
        consulta: "- El personal (meseros) está capacitado para explicar los platillos y sugerir maridajes con bebidas.\n- Atención telefónica para reservaciones o preguntas.",
        tomaPedidos: "- Toma de pedidos directamente en la mesa por parte de los meseros.\n- Pedidos para llevar vía telefónica.",
        hospitalidad: "- Recepción amable en la entrada.\n- Ambiente musical acorde al concepto (regional de día, más animado de noche).\n- Cortesías (ej. totopos y salsa) al sentarse.",
        cuidadoPertenencias: "- Ganchos en las mesas o percheros para bolsas y abrigos.\n- Cuidado con los autos en el estacionamiento (si aplica).",
        excepciones: "- Flexibilidad para ajustar platillos por alergias o preferencias (ej. 'sin cebolla').\n- Manejo de quejas o platillos que no cumplen expectativas directamente por el gerente.",
        facturacion: "- Entrega de cuenta detallada en la mesa.\n- Posibilidad de solicitar factura fiscal con los datos del cliente.",
        pago: "- Pago en efectivo o con tarjeta de crédito/débito en la caja o con terminal móvil en la mesa."
    },
    "pizzeria-siglo-xxi": {
        informacion: "- Página web y redes sociales con el menú, la historia de la pizzería y la misión de inclusión.\n- Folletos en el local que explican el proyecto.",
        consulta: "- Personal en caja capacitado para describir las especialidades de la casa.\n- Línea telefónica para consultas sobre ingredientes o pedidos grandes.",
        tomaPedidos: "- Pedidos en el mostrador.\n- Pedidos a través de plataformas de delivery (Rappi, Uber Eats).\n- Pedidos online a través de la página web.",
        hospitalidad: "- Saludo cálido y sonrisa por parte de todo el personal.\n- Decoración que celebra los logros del equipo.\n- Historias de los empleados visibles en el local.",
        cuidadoPertenencias: "- Empaque de alta calidad que mantiene la pizza caliente y segura.\n- Bolsas resistentes para pedidos para llevar.",
        excepciones: "- Manejo de pedidos especiales (mitad y mitad, sin algún ingrediente).\n- Política clara para resolver errores en los pedidos de forma rápida y satisfactoria.",
        facturacion: "- Ticket de compra claro y detallado.\n- Proceso sencillo para solicitar factura electrónica en línea.",
        pago: "- Aceptamos efectivo, tarjetas de crédito/débito, y pagos a través de las apps de delivery."
    }
};


export default function ServiceFlowerPage() {
    const [selectedProject, setSelectedProject] = useState("cafe-aroma");
    const [state, setState] = useState<ServiceFlowerState>(serviceFlowerData[selectedProject]);

    const handleProjectChange = (projectId: string) => {
        setSelectedProject(projectId);
        setState(serviceFlowerData[projectId as keyof typeof serviceFlowerData] || { informacion: '', consulta: '', tomaPedidos: '', hospitalidad: '', cuidadoPertenencias: '', excepciones: '', facturacion: '', pago: '' });
    };

    const handleSave = () => {
        console.log("Guardando Flor del Servicio:", state);
        alert("Lienzo guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex-grow">
                     <PageHeader
                        title="Lienzo de la Flor del Servicio"
                        description="Diseña los servicios suplementarios que rodean y añaden valor a tu producto principal."
                        projectSelector={
                           <Select value={selectedProject} onValueChange={handleProjectChange}>
                              <SelectTrigger className="w-auto border-none shadow-none text-xl font-bold p-0 focus:ring-0">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cafe-aroma">Proyecto: Café 'Aroma de Montaña'</SelectItem>
                                <SelectItem value="restaurante-gambusinos">Proyecto: Restaurant-Bar "Gambusinos"</SelectItem>
                                <SelectItem value="pizzeria-siglo-xxi">Proyecto: Pizzería Siglo XXI</SelectItem>
                                {/* Add other projects as needed */}
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
                    <CardTitle>Los 8 Pétalos del Servicio</CardTitle>
                    <CardDescription>Rellena cada pétalo para visualizar la experiencia completa del cliente.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-4 text-center">
                        <Label className="text-xl font-bold">Producto Principal</Label>
                        <p className="text-muted-foreground">
                            {selectedProject === 'cafe-aroma' && 'Café de Especialidad'}
                            {selectedProject === 'restaurante-gambusinos' && 'Servicio de Restaurant-Bar Regional'}
                            {selectedProject === 'pizzeria-siglo-xxi' && 'Pizzas y Galletas Artesanales con Causa'}
                        </p>
                    </div>

                    <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="informacion" className="text-base font-semibold">1. Información</Label>
                        <Textarea id="informacion" value={state.informacion} onChange={createChangeHandler(setState, 'informacion')} placeholder="¿Cómo accede el cliente a la información?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="consulta" className="text-base font-semibold">2. Consulta</Label>
                        <Textarea id="consulta" value={state.consulta} onChange={createChangeHandler(setState, 'consulta')} placeholder="¿Ofreces asesoramiento o consejo?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="tomaPedidos" className="text-base font-semibold">3. Toma de Pedidos</Label>
                        <Textarea id="tomaPedidos" value={state.tomaPedidos} onChange={createChangeHandler(setState, 'tomaPedidos')} placeholder="¿Cómo realiza el cliente su pedido?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="hospitalidad" className="text-base font-semibold">4. Hospitalidad</Label>
                        <Textarea id="hospitalidad" value={state.hospitalidad} onChange={createChangeHandler(setState, 'hospitalidad')} placeholder="¿Cómo haces sentir bienvenido al cliente?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="cuidadoPertenencias" className="text-base font-semibold">5. Cuidado de Pertenencias</Label>
                        <Textarea id="cuidadoPertenencias" value={state.cuidadoPertenencias} onChange={createChangeHandler(setState, 'cuidadoPertenencias')} placeholder="¿Cuidas de las cosas del cliente?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="excepciones" className="text-base font-semibold">6. Excepciones</Label>
                        <Textarea id="excepciones" value={state.excepciones} onChange={createChangeHandler(setState, 'excepciones')} placeholder="¿Cómo manejas peticiones especiales o problemas?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="facturacion" className="text-base font-semibold">7. Facturación</Label>
                        <Textarea id="facturacion" value={state.facturacion} onChange={createChangeHandler(setState, 'facturacion')} placeholder="¿Cómo es el proceso de facturación?" rows={5}/>
                    </div>
                     <div className="space-y-2 p-4 bg-gray-100 rounded-lg">
                        <Label htmlFor="pago" className="text-base font-semibold">8. Pago</Label>
                        <Textarea id="pago" value={state.pago} onChange={createChangeHandler(setState, 'pago')} placeholder="¿Qué métodos de pago aceptas?" rows={5}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

    