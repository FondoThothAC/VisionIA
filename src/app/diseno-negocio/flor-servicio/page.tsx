
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Save } from "lucide-react";

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

const initialState: ServiceFlowerState = {
    informacion: "- Página web con detalles de cada café, origen y notas de sabor.\n- Guías de preparación en el blog.\n- FAQ con información de envíos y suscripciones.",
    consulta: "- Chat en vivo en el sitio web para resolver dudas sobre el mejor café para su gusto.\n- Consultoría por email para clientes B2B (cafeterías).",
    tomaPedidos: "- Carrito de compras online 24/7.\n- Proceso de suscripción automatizado.\n- Pedidos vía WhatsApp para clientes locales.",
    hospitalidad: "- Email de bienvenida personalizado al crear una cuenta.\n- Nota de agradecimiento escrita a mano en cada primer pedido.\n- Ambiente acogedor en futuros talleres de catación.",
    cuidadoPertenencias: "- Empaque seguro y robusto para proteger el café durante el envío.\n- Envoltura para regalo disponible como opción.",
    excepciones: "- Política de devolución clara si el café llega dañado.\n- Flexibilidad para pausar o cambiar la suscripción mensual.\n- Atención a peticiones especiales (ej. un molido específico).",
    facturacion: "- Factura automática enviada por email tras la compra.\n- Resumen claro y mensual de los cargos de suscripción.",
    pago: "- Aceptamos tarjetas de crédito/débito (Stripe), PayPal y transferencias bancarias (SPEI)."
};

export default function ServiceFlowerPage() {
    const [state, setState] = useState<ServiceFlowerState>(initialState);

    const handleSave = () => {
        console.log("Guardando Flor del Servicio:", state);
        alert("Lienzo guardado en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start">
                <PageHeader
                    title="Lienzo de la Flor del Servicio"
                    description="Diseña los servicios suplementarios que rodean y añaden valor a tu producto principal."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Los 8 Pétalos del Servicio</CardTitle>
                    <CardDescription>Rellena cada pétalo para visualizar la experiencia completa del cliente.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-4 text-center">
                        <Label className="text-xl font-bold">Producto Principal</Label>
                        <p className="text-muted-foreground">Café de Especialidad</p>
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
