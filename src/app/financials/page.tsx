
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  ComposedChart,
  ReferenceLine,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { FileDown, TrendingDown, TrendingUp, DollarSign, Users, AlertCircle, BookOpen, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PageHeader from "@/components/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Separator } from '@/components/ui/separator';


const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
  }).format(value);
  
const chartOfAccounts = [
  // --- Activos ---
  { code: '1', name: 'CUENTAS DE ACTIVO', type: 'MainHeader', description: 'Bienes y derechos de la empresa. Aumentan con Cargos (Debe), Disminuyen con Abonos (Haber).' },
  { code: '1.1', name: 'ACTIVO CIRCULANTE (Corto Plazo)', type: 'Header' },
  { code: '1.1.1', name: 'Efectivo y Equivalentes', type: 'SubHeader' },
  { code: '1.1.1.1', name: 'Caja', type: 'Account' },
  { code: '1.1.1.2', name: 'Bancos', type: 'Account' },
  { code: '1.1.2', name: 'Cuentas por Cobrar', type: 'SubHeader' },
  { code: '1.1.2.1', name: 'Clientes', type: 'Account' },
  { code: '1.1.2.2', name: 'Deudores Diversos', type: 'Account' },
  { code: '1.1.2.3', name: 'Funcionarios y Empleados', type: 'Account' },
  { code: '1.1.2.4', name: 'Estimación para Cuentas Incobrables', type: 'Account', note: 'Cuenta de valuación, resta al activo' },
  { code: '1.1.3', name: 'Inventarios', type: 'SubHeader' },
  { code: '1.1.3.1', name: 'Almacén de Materia Prima', type: 'Account' },
  { code: '1.1.3.2', name: 'Producción en Proceso', type: 'Account' },
  { code: '1.1.3.3', name: 'Almacén de Artículo Terminado', type: 'Account' },
  { code: '1.1.4', name: 'Pagos Anticipados', type: 'SubHeader' },
  { code: '1.1.4.1', name: 'Rentas Pagadas por Anticipado', type: 'Account' },
  { code: '1.1.4.2', name: 'Seguros y Fianzas Pagados por Anticipado', type: 'Account' },
  { code: '1.1.4.3', name: 'Publicidad Pagada por Anticipado', type: 'Account' },

  { code: '1.2', name: 'ACTIVO NO CIRCULANTE (Largo Plazo)', type: 'Header' },
  { code: '1.2.1', name: 'Propiedades, Planta y Equipo', type: 'SubHeader' },
  { code: '1.2.1.1', name: 'Terrenos', type: 'Account' },
  { code: '1.2.1.2', name: 'Edificios', type: 'Account' },
  { code: '1.2.1.3', name: 'Mobiliario y Equipo de Oficina', type: 'Account' },
  { code: '1.2.1.4', name: 'Equipo de Cómputo', type: 'Account' },
  { code: '1.2.1.5', name: 'Equipo de Transporte', type: 'Account' },
  { code: '1.2.2', name: 'Depreciación Acumulada', type: 'SubHeader' },
  { code: '1.2.2.1', name: 'Dep. Acum. de Edificios', type: 'Account', note: 'Cuenta de valuación, resta al activo' },
  { code: '1.2.2.2', name: 'Dep. Acum. de Mobiliario y Equipo', type: 'Account', note: 'Cuenta de valuación, resta al activo' },
  { code: '1.2.2.3', name: 'Dep. Acum. de Equipo de Cómputo', type: 'Account', note: 'Cuenta de valuación, resta al activo' },
  { code: '1.2.2.4', name: 'Dep. Acum. de Equipo de Transporte', type: 'Account', note: 'Cuenta de valuación, resta al activo' },
  { code: '1.2.3', name: 'Activos Intangibles', type: 'SubHeader' },
  { code: '1.2.3.1', name: 'Patentes y Marcas', type: 'Account' },
  { code: '1.2.3.2', name: 'Licencias y Software', type: 'Account' },
  { code: '1.2.3.3', name: 'Crédito Mercantil (Goodwill)', type: 'Account' },
  
  // --- Pasivos ---
  { code: '2', name: 'CUENTAS DE PASIVO', type: 'MainHeader', description: 'Deudas y obligaciones. Disminuyen con Cargos (Debe), Aumentan con Abonos (Haber).' },
  { code: '2.1', name: 'PASIVO A CORTO PLAZO', type: 'Header' },
  { code: '2.1.1', name: 'Proveedores', type: 'Account' },
  { code: '2.1.2', name: 'Acreedores Diversos', type: 'Account' },
  { code: '2.1.3', name: 'Documentos por Pagar a Corto Plazo', type: 'Account' },
  { code: '2.1.4', name: 'Impuestos por Pagar', type: 'Account' },
  { code: '2.1.5', name: 'Sueldos y Salarios por Pagar', type: 'Account' },
  { code: '2.2', name: 'PASIVO A LARGO PLAZO', type: 'Header' },
  { code: '2.2.1', name: 'Préstamos Bancarios a Largo Plazo', type: 'Account' },
  { code: '2.2.2', name: 'Hipotecas por Pagar', type: 'Account' },
  { code: '2.2.3', name: 'Documentos por Pagar a Largo Plazo', type: 'Account' },
  
  // --- Capital Contable ---
  { code: '3', name: 'CUENTAS DE CAPITAL CONTABLE', type: 'MainHeader', description: 'Patrimonio de los dueños. Disminuyen con Cargos (Debe), Aumentan con Abonos (Haber).' },
  { code: '3.1', name: 'CAPITAL CONTRIBUIDO', type: 'Header' },
  { code: '3.1.1', name: 'Capital Social', type: 'Account' },
  { code: '3.1.2', name: 'Aportaciones para Futuros Aumentos de Capital', type: 'Account' },
  { code: '3.2', name: 'CAPITAL GANADO', type: 'Header' },
  { code: '3.2.1', name: 'Utilidades Acumuladas', type: 'Account' },
  { code: '3.2.2', name: 'Utilidad (o Pérdida) del Ejercicio', type: 'Account' },
  
  // --- Cuentas de Resultados (Ingresos) ---
  { code: '4', name: 'CUENTAS DE INGRESOS', type: 'MainHeader', description: 'Registran las ventas o ingresos. Disminuyen con Cargos (Debe), Aumentan con Abonos (Haber).' },
  { code: '4.1', name: 'Ingresos por Ventas / Servicios', type: 'Account' },
  { code: '4.2', name: 'Devoluciones y Descuentos sobre Venta', type: 'Account', note: 'Resta a los ingresos' },
  { code: '4.3', name: 'Otros Ingresos', type: 'Account' },
  
  // --- Cuentas de Resultados (Costos y Gastos) ---
  { code: '5', name: 'CUENTAS DE COSTOS Y GASTOS', type: 'MainHeader', description: 'Registran los costos y gastos. Aumentan con Cargos (Debe), Disminuyen con Abonos (Haber).' },
  { code: '5.1', name: 'COSTO DE VENTAS', type: 'Header' },
  { code: '5.1.1', name: 'Costo de la Mercancía Vendida', type: 'Account' },
  { code: '5.2', name: 'GASTOS DE OPERACIÓN', type: 'Header' },
  { code: '5.2.1', name: 'Gastos de Venta', type: 'SubHeader' },
  { code: '5.2.1.1', name: 'Sueldos y Salarios (Ventas)', type: 'Account' },
  { code: '5.2.1.2', name: 'Comisiones a Vendedores', type: 'Account' },
  { code: '5.2.1.3', name: 'Publicidad y Propaganda', type: 'Account' },
  { code: '5.2.2', name: 'Gastos de Administración', type: 'SubHeader' },
  { code: '5.2.2.1', name: 'Sueldos y Salarios (Admin)', type: 'Account' },
  { code: '5.2.2.2', name: 'Renta de Oficinas', type: 'Account' },
  { code: '5.2.2.3', name: 'Papelería y Útiles de Oficina', type: 'Account' },
  { code: '5.2.2.4', name: 'Servicios Públicos', type: 'Account' },
  { code: '5.2.2.5', name: 'Honorarios a Profesionales Externos', type: 'Account' },
  { code: '5.2.2.6', name: 'Depreciaciones y Amortizaciones', type: 'Account' },
  { code: '5.3', name: 'GASTOS FINANCIEROS', type: 'Header' },
  { code: '5.3.1', name: 'Intereses Pagados', type: 'Account' },
  { code: '5.3.2', name: 'Comisiones Bancarias', type: 'Account' },
];


const kpis = [
    { id: "cac", name: "CAC (Costo de Adquisición de Cliente)", formula: "(Inversión en Marketing y Ventas) / (Nuevos Clientes)", description: "Mide cuánto cuesta adquirir un nuevo cliente." },
    { id: "clv", name: "CLV (Valor del Ciclo de Vida del Cliente)", formula: "(Ticket Promedio) x (Frecuencia de Compra) x (Vida del Cliente)", description: "Predice el beneficio neto atribuido a toda la futura relación con un cliente." },
    { id: "clv-cac", name: "Relación CLV:CAC", formula: "CLV / CAC", description: "Compara el valor de un cliente con lo que costó adquirirlo. Un ratio saludable suele ser 3:1 o superior." },
    { id: "churn", name: "Tasa de Churn", formula: "(Clientes Perdidos / Clientes al Inicio) x 100", description: "Porcentaje de clientes que dejan de usar tu servicio en un período determinado." },
    { id: "retention", name: "Tasa de Retención", formula: "((Clientes al Final - Nuevos Clientes) / Clientes al Inicio) x 100", description: "Porcentaje de clientes que continúan contigo durante un período." },
    { id: "conversion", name: "Tasa de Conversión", formula: "(Número de Conversiones / Número de Visitantes) x 100", description: "Porcentaje de usuarios que realizan una acción deseada (compra, registro, etc.)." },
    { id: "ctr", name: "CTR (Click-Through Rate)", formula: "(Clics / Impresiones) x 100", description: "Porcentaje de personas que hacen clic en un enlace o anuncio después de verlo." },
    { id: "cpc", name: "CPC (Costo por Clic)", formula: "Costo Total de la Campaña / Número de Clics", description: "Costo que pagas por cada clic en uno de tus anuncios." },
    { id: "cpm", name: "CPM (Costo por Mil Impresiones)", formula: "(Costo de la Campaña / Número de Impresiones) x 1000", description: "Costo de mil visualizaciones (impresiones) de un anuncio." },
    { id: "cpa", name: "CPA (Costo por Adquisición)", formula: "Costo Total / Número de Adquisiciones", description: "Costo de adquirir un cliente, que puede incluir más que solo marketing." },
    { id: "roas", name: "ROAS (Retorno de la Inversión Publicitaria)", formula: "(Ingresos por Publicidad / Costo de Publicidad) x 100", description: "Mide los ingresos brutos generados por cada dólar gastado en publicidad." },
    { id: "romi", name: "ROMI (Retorno de la Inversión en Marketing)", formula: "((Ingresos por Marketing - Costos de Marketing) / Costos de Marketing) x 100", description: "Mide la rentabilidad de las actividades de marketing." },
    { id: "aov", name: "Ticket Promedio (AOV)", formula: "Ingresos Totales / Número de Pedidos", description: "La cantidad promedio que un cliente gasta en una sola transacción." },
    { id: "purchase-freq", name: "Frecuencia de Compra", formula: "Número de Pedidos / Número de Clientes Únicos", description: "Con qué frecuencia tus clientes realizan una compra en un período." },
    { id: "repurchase-rate", name: "Tasa de Recompra", formula: "(Clientes que Compraron Más de Una Vez / Clientes Totales) x 100", description: "Porcentaje de clientes que vuelven a comprar." },
    { id: "nps", name: "NPS (Net Promoter Score)", formula: "% Promotores - % Detractores", description: "Mide la lealtad del cliente preguntando qué tan probable es que recomienden tu empresa." },
    { id: "csat", name: "CSAT (Customer Satisfaction Score)", formula: "(Número de Respuestas Positivas / Número Total de Respuestas) x 100", description: "Mide la satisfacción del cliente con un producto o servicio específico." },
    { id: "ces", name: "CES (Customer Effort Score)", formula: "Suma de todas las puntuaciones / Número de respuestas", description: "Mide cuánto esfuerzo tuvo que hacer un cliente para resolver un problema." },
    { id: "returns-rate", name: "Tasa de Devoluciones", formula: "(Número de Artículos Devueltos / Número de Artículos Vendidos) x 100", description: "Porcentaje de productos vendidos que son devueltos por los clientes." },
    { id: "claims-rate", name: "Tasa de Reclamaciones", formula: "(Número de Reclamaciones / Número de Pedidos) x 100", description: "Porcentaje de pedidos que resultan en una reclamación del cliente." },
    { id: "defects-rate", name: "Tasa de Defectos", formula: "(Unidades Defectuosas / Unidades Producidas) x 100", description: "Porcentaje de productos que no cumplen con los estándares de calidad." },
    { id: "inventory-turnover", name: "Rotación de Inventario", formula: "Costo de Mercancías Vendidas / Inventario Promedio", description: "Cuántas veces una empresa vende y reemplaza su inventario durante un período." },
    { id: "dio", name: "DIO (Días de Inventario Pendiente)", formula: "(Inventario Promedio / Costo de Ventas) x 365", description: "El número promedio de días que una empresa mantiene su inventario." },
    { id: "dso", name: "DSO (Días de Cuentas por Cobrar)", formula: "(Cuentas por Cobrar / Ventas a Crédito Totales) x 365", description: "El número promedio de días que tarda una empresa en cobrar el pago después de una venta." },
    { id: "dpo", name: "DPO (Días de Cuentas por Pagar)", formula: "(Cuentas por Pagar / Costo de Ventas) x 365", description: "El número promedio de días que tarda una empresa en pagar a sus proveedores." },
    { id: "ccc", name: "CCC (Ciclo de Conversión de Efectivo)", formula: "DIO + DSO - DPO", description: "El tiempo que tarda una empresa en convertir sus inversiones en inventario y otros recursos en efectivo." },
    { id: "on-time-delivery", name: "Entregas a Tiempo (On-Time Delivery)", formula: "(Pedidos Entregados a Tiempo / Pedidos Totales) x 100", description: "Porcentaje de pedidos entregados dentro del plazo prometido." },
    { id: "lead-time", name: "Lead Time (Tiempo de Entrega)", formula: "Fecha de Entrega del Pedido - Fecha de Realización del Pedido", description: "El tiempo total desde que se inicia un proceso hasta que se completa." },
    { id: "fill-rate", name: "Fill Rate (Tasa de Cumplimiento)", formula: "(Pedidos Enviados Completos / Pedidos Totales) x 100", description: "Porcentaje de la demanda del cliente que se cumple desde el stock disponible." },
    { id: "fcr", name: "FCR (First Contact Resolution)", formula: "(Casos Resueltos en el Primer Contacto / Casos Totales) x 100", description: "Porcentaje de problemas de clientes resueltos en el primer contacto." },
    { id: "aht", name: "AHT (Average Handle Time)", formula: "(Tiempo Total de Conversación + Tiempo en Espera + Tareas Posteriores) / Llamadas Totales", description: "El tiempo promedio que un agente de servicio al cliente dedica a una interacción." },
    { id: "bounce-rate", name: "Bounce Rate (Tasa de Rebote)", formula: "(Visitas de una Sola Página / Visitas Totales) x 100", description: "Porcentaje de visitantes de un sitio web que se van después de ver solo una página." },
    { id: "cart-abandonment", name: "Abandono de Carrito", formula: "1 - (Transacciones Completadas / Carritos Creados) x 100", description: "Porcentaje de compradores en línea que agregan artículos a un carrito pero no completan la compra." },
    { id: "sov", name: "Share of Voice (SoV)", formula: "(Visibilidad de tu Marca / Visibilidad Total del Mercado) x 100", description: "La cuota de participación de tu marca en las conversaciones en línea en comparación con tus competidores." },
    { id: "market-share", name: "Market Share (Cuota de Mercado)", formula: "(Ventas de tu Empresa / Ventas Totales del Mercado) x 100", description: "El porcentaje de las ventas totales en una industria generado por una empresa en particular." }
];

const chartConfig = {
  Ingresos: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  Costos: {
    label: "Costos",
    color: "hsl(var(--chart-2))",
  },
  Beneficio: {
    label: "Beneficio",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const TAccountCard = ({ name, note, nature }: { name: string, note?: string, nature: string }) => {
    const isDebitNature = nature === "debit";
    return (
        <Card className="text-center">
            <CardHeader className="p-3 pb-2">
                <CardTitle className="text-base">{name}</CardTitle>
                {note && <CardDescription className="text-xs text-amber-600">{note}</CardDescription>}
            </CardHeader>
            <Separator />
            <CardContent className="p-0">
                <div className="grid grid-cols-2">
                    <div className={`p-3 ${isDebitNature ? 'bg-green-50' : 'bg-red-50'}`}>
                        <h4 className="font-semibold">Debe (Cargos)</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                            {isDebitNature ? 'Aquí se registran los AUMENTOS.' : 'Aquí se registran las DISMINUCIONES.'}
                        </p>
                    </div>
                    <div className={`p-3 border-l ${!isDebitNature ? 'bg-green-50' : 'bg-red-50'}`}>
                        <h4 className="font-semibold">Haber (Abonos)</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                           {!isDebitNature ? 'Aquí se registran los AUMENTOS.' : 'Aquí se registran las DISMINUCIONES.'}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};

const SocialChargeGuide = () => (
    <Card>
        <CardContent className="pt-6">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        <div className="flex items-center gap-3">
                           <Info className="h-5 w-5 text-blue-500"/>
                           <span className="font-semibold">Guía: Cálculo de Carga Social Patronal (México)</span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose prose-sm max-w-none dark:prose-invert">
                        <p>
                           Este documento detalla los cálculos y porcentajes que un empleador (patrón) en México debe cubrir por cada trabajador, adicional a su salario. Los cálculos se basan en el Salario Base de Cotización (SBC) y la Unidad de Medida y Actualización (UMA).
                        </p>
                        <h4>Conceptos Clave</h4>
                        <ul>
                            <li><strong>SBC (Salario Base de Cotización):</strong> Es el salario diario del trabajador más todas las prestaciones de ley (proporcionales de aguinaldo y prima vacacional). Es la base sobre la que se calculan casi todas las cuotas.</li>
                             <li><strong>UMA (Unidad de Medida y Actualización):</strong> Valor de referencia para determinar cuotas fijas y topes. Para 2024: $108.57 MXN.</li>
                        </ul>

                        <h4>Tabla de Cuotas y Fórmulas para el Patrón</h4>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ramo de Seguro</TableHead>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead>Porcentaje Patronal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow><TableCell rowSpan={8} className="font-semibold align-top">IMSS</TableCell><TableCell>Riesgos de Trabajo</TableCell><TableCell>Variable (Clase I a V, ej. 0.52150%)</TableCell></TableRow>
                                <TableRow><TableCell>Enfermedades y Maternidad (Cuota Fija)</TableCell><TableCell>20.40% sobre UMA</TableCell></TableRow>
                                <TableRow><TableCell>Enfermedades y Maternidad (Diferencial)</TableCell><TableCell>1.10% sobre (SBC - 3 UMA)</TableCell></TableRow>
                                <TableRow><TableCell>Enfermedades y Maternidad (Prest. en Dinero)</TableCell><TableCell>0.70% sobre SBC</TableCell></TableRow>
                                <TableRow><TableCell>Invalidez y Vida</TableCell><TableCell>1.75% sobre SBC</TableCell></TableRow>
                                <TableRow><TableCell>Retiro (SAR)</TableCell><TableCell>2.00% sobre SBC</TableCell></TableRow>
                                <TableRow><TableCell>Cesantía y Vejez</TableCell><TableCell>3.150% sobre SBC</TableCell></TableRow>
                                <TableRow><TableCell>Guarderías y Prestaciones Sociales</TableCell><TableCell>1.00% sobre SBC</TableCell></TableRow>
                                <TableRow><TableCell className="font-semibold">INFONAVIT</TableCell><TableCell>Vivienda</TableCell><TableCell>5.00% sobre SBC</TableCell></TableRow>
                                <TableRow><TableCell className="font-semibold">ISN</TableCell><TableCell>Impuesto Sobre Nómina</TableCell><TableCell>Variable (Estatal, ej. 3%)</TableCell></TableRow>
                            </TableBody>
                        </Table>
                         
                        <h4>Ejemplo Práctico Completo</h4>
                        <p><strong>Datos:</strong> Salario Mensual Bruto de $15,000.00, empresa de software (Clase I Riesgo), CDMX (ISN 3%).</p>
                        <ol>
                           <li>
                                <strong>Calcular SBC Diario:</strong>
                                <ul>
                                    <li>Salario Diario: $15,000 / 30 = $500.00</li>
                                    <li>Proporcional Aguinaldo: (15 / 365) x $500 = $20.55</li>
                                    <li>Proporcional Prima Vacacional: (12 x 25% / 365) x $500 = $4.11</li>
                                    <li><strong>SBC Diario = $524.66</strong></li>
                                </ul>
                           </li>
                           <li>
                                <strong>Calcular Cuotas Mensuales (30 días):</strong>
                                 <Table>
                                    <TableBody>
                                        <TableRow><TableCell>IMSS - Riesgos de Trabajo</TableCell><TableCell className="text-right">$82.08</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Cuota Fija (EyM)</TableCell><TableCell className="text-right">$664.47</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Cuota Adicional (EyM)</TableCell><TableCell className="text-right">$197.94</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Prestaciones Dinero</TableCell><TableCell className="text-right">$110.18</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Invalidez y Vida</TableCell><TableCell className="text-right">$275.45</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Retiro (SAR)</TableCell><TableCell className="text-right">$314.80</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Cesantía y Vejez</TableCell><TableCell className="text-right">$495.93</TableCell></TableRow>
                                        <TableRow><TableCell>IMSS - Guarderías</TableCell><TableCell className="text-right">$157.40</TableCell></TableRow>
                                        <TableRow><TableCell>INFONAVIT</TableCell><TableCell className="text-right">$786.99</TableCell></TableRow>
                                        <TableRow><TableCell>ISN (Impuesto S/ Nómina)</TableCell><TableCell className="text-right">$450.00</TableCell></TableRow>
                                        <TableRow className="font-bold"><TableCell>Total Carga Social Mensual</TableCell><TableCell className="text-right">$3,535.24</TableCell></TableRow>
                                    </TableBody>
                                </Table>
                           </li>
                        </ol>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="font-bold text-blue-800">Conclusión del Ejemplo:</p>
                            <p className="text-blue-700">Para un empleado con un salario bruto de $15,000.00 MXN, el costo total real para la empresa es de <strong>$18,535.24</strong> (Salario + Carga Social).</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
);

export default function FinancialsPage() {
  // --- STATE MANAGEMENT ---
  const [projectionMonths, setProjectionMonths] = useState(12);

  // Key Assumptions
  const [initialInvestment, setInitialInvestment] = useState(50000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(15000);
  const [monthlyGrowth, setMonthlyGrowth] = useState(3); // Percentage
  const [inflationRate, setInflationRate] = useState(4.5); // Annual inflation rate

  // Personnel Costs
  const [employees, setEmployees] = useState(2);
  const [avgSalary, setAvgSalary] = useState(8000);

  // Fixed & Variable Costs
  const [costs, setCosts] = useState({
    rent: 1200,
    utilities: 500, // Water, electricity, internet
    marketing: 800,
    software: 300,
    supplies: 400,
    insurance: 400,
    transport: 250,
    other: 200,
  });

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCosts((prev) => ({ ...prev, [name]: Number(value) || 0 }));
  };

  // --- CALCULATIONS ---
  const calculateProjections = () => {
    const data = [];
    let currentRevenue = monthlyRevenue;

    const totalSalaryCost = employees * avgSalary;
    const otherCosts = Object.values(costs).reduce((acc, v) => acc + v, 0);
    const totalMonthlyCost = totalSalaryCost + otherCosts;

    for (let i = 1; i <= projectionMonths; i++) {
      const profit = currentRevenue - totalMonthlyCost;
      const cumulativeProfit = (data[i - 2]?.cumulativeProfit || 0) + profit;
      data.push({
        month: `Mes ${i}`,
        Ingresos: Math.round(currentRevenue),
        Costos: Math.round(totalMonthlyCost),
        Beneficio: Math.round(profit),
        Beneficio_Acumulado: Math.round(cumulativeProfit),
        Punto_Equilibrio: totalMonthlyCost
      });
      currentRevenue *= 1 + monthlyGrowth / 100;
    }
    return { data, totalMonthlyCost };
  };

  const { data: projectionData, totalMonthlyCost } = calculateProjections();
  const totalProfit = projectionData.reduce((acc, d) => acc + d.Beneficio, 0);
  const finalCumulativeProfit = projectionData[projectionData.length - 1]?.Beneficio_Acumulado || 0;
  const growthBeatsInflation = monthlyGrowth > (Math.pow(1 + inflationRate / 100, 1 / 12) - 1) * 100;

  return (
     <div className="space-y-8">
      <PageHeader
        title="Modelado Financiero"
        description="Genera estados financieros, ratios y gráficos. Realiza análisis 'what-if' para pronosticar el futuro de tu negocio."
      />
      
       <Tabs defaultValue="projections">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="projections">Proyecciones Financieras</TabsTrigger>
          <TabsTrigger value="kpis">Indicadores (KPIs)</TabsTrigger>
          <TabsTrigger value="accounts">Catálogo de Cuentas</TabsTrigger>
        </TabsList>

        <TabsContent value="projections">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {/* Column 1: Assumptions & Personnel */}
            <div className="space-y-6 xl:col-span-1">
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-primary"/> Supuestos Clave</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="initialInvestment">Inversión Inicial</Label>
                    <Input id="initialInvestment" type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="monthlyRevenue">Ingresos (Primer Mes)</Label>
                    <Input id="monthlyRevenue" type="number" value={monthlyRevenue} onChange={(e) => setMonthlyRevenue(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="monthlyGrowth">Crecimiento Mensual Ingresos (%)</Label>
                    <Input id="monthlyGrowth" type="number" value={monthlyGrowth} onChange={(e) => setMonthlyGrowth(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="inflationRate">Tasa de Inflación Anual (%)</Label>
                    <Input id="inflationRate" type="number" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value))} />
                </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary"/> Costos de Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="employees">Número de Empleados</Label>
                    <Input id="employees" type="number" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="avgSalary">Salario Promedio Mensual (Bruto)</Label>
                    <Input id="avgSalary" type="number" value={avgSalary} onChange={(e) => setAvgSalary(Number(e.target.value))} />
                </div>
                </CardContent>
            </Card>
            <SocialChargeGuide />
            </div>
            
            {/* Column 2: Costs */}
            <div className="space-y-6 lg:col-span-2 xl:col-span-1">
            <Card>
                <CardHeader>
                <CardTitle>Costos Operativos Mensuales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                    {Object.entries(costs).map(([key, value]) => (
                        <div key={key} className="space-y-1.5">
                        <Label htmlFor={key} className="capitalize text-sm">{key.replace('_', ' ')}</Label>
                        <Input id={key} name={key} type="number" value={value} onChange={handleCostChange} className="h-9"/>
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>
            </div>

            {/* Column 3: Projections & Chart */}
            <div className="lg:col-span-3 xl:col-span-2">
            <Card>
                <CardHeader>
                <CardTitle>Proyección a {projectionMonths} Meses</CardTitle>
                <CardDescription>
                    Ajusta el control deslizante para cambiar el período de proyección y visualiza los resultados.
                </CardDescription>
                <div className="flex items-center space-x-4 pt-4">
                    <Label>Periodo:</Label>
                    <Slider defaultValue={[projectionMonths]} min={6} max={60} step={6} onValueChange={(value) => setProjectionMonths(value[0])} />
                    <span>{projectionMonths} meses</span>
                </div>
                </CardHeader>
                <CardContent className="h-[400px] w-full pt-6">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer>
                      <ComposedChart data={projectionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                      <ChartTooltip
                          cursor={{ fill: 'hsl(var(--muted))' }}
                          content={<ChartTooltipContent formatter={(value, name) => {
                              if (typeof value !== 'number') return [value, name];
                              if (name === 'Ingresos') return [formatCurrency(value), 'Ingresos'];
                              if (name === 'Costos') return [formatCurrency(value), 'Costos'];
                              if (name === 'Beneficio') return [formatCurrency(value), 'Beneficio'];
                              return [value, name];
                          }}/>}
                      />
                      <Bar dataKey="Ingresos" fill="var(--color-Ingresos)" radius={[4, 4, 0, 0]} name="Ingresos"/>
                      <Bar dataKey="Costos" fill="var(--color-Costos)" radius={[4, 4, 0, 0]} name="Costos"/>
                      <Line type="monotone" dataKey="Beneficio" stroke="var(--color-Beneficio)" strokeWidth={2} dot={false} name="Beneficio Neto"/>
                      <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                      </ComposedChart>
                  </ResponsiveContainer>
                </ChartContainer>
                </CardContent>
            </Card>
            </div>
            </div>
            
            {/* --- SUMMARY & TABLE --- */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
            <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader className="pb-4">
                    <CardTitle>Resumen Financiero</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Costo Operativo Mensual</span>
                        <span className="font-medium">{formatCurrency(totalMonthlyCost)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Beneficio Total ({projectionMonths}m)</span>
                        <span className={`font-medium ${totalProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(totalProfit)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Beneficio Acumulado</span>
                        <span className={`font-medium ${finalCumulativeProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(finalCumulativeProfit)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Crecimiento vs Inflación</span>
                        <Badge variant={growthBeatsInflation ? 'default' : 'destructive'} className="gap-1.5 pl-2 pr-2.5">
                        {growthBeatsInflation ? <TrendingUp className="h-4 w-4"/> : <TrendingDown className="h-4 w-4"/>}
                        {growthBeatsInflation ? 'Supera' : 'Debajo'}
                        </Badge>
                    </div>
                </CardContent>
                </Card>
                { finalCumulativeProfit < initialInvestment &&
                    <Card className="bg-amber-50 border-amber-200">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-4">
                            <AlertCircle className="h-6 w-6 text-amber-600"/>
                            <div>
                            <CardTitle className="text-amber-900 text-base">Análisis de Inversión</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="text-amber-800 text-sm">
                        Tu beneficio acumulado en {projectionMonths} meses no cubre la inversión inicial. Considera ajustar precios, costos o la estrategia de crecimiento.
                        </CardContent>
                    </Card>
                }
            </div>
            <div className="lg:col-span-3">
                <Card>
                    <CardHeader><CardTitle>Tabla de Proyección Detallada</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead>Mes</TableHead>
                                <TableHead className="text-right">Ingresos</TableHead>
                                <TableHead className="text-right">Costos Totales</TableHead>
                                <TableHead className="text-right">Beneficio Neto</TableHead>
                                <TableHead className="text-right">Beneficio Acumulado</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {projectionData.map((d) => (
                                <TableRow key={d.month}>
                                <TableCell className="font-medium">{d.month}</TableCell>
                                <TableCell className="text-right text-green-600">{formatCurrency(d.Ingresos)}</TableCell>
                                <TableCell className="text-right text-red-600">{formatCurrency(d.Costos)}</TableCell>
                                <TableCell className={`text-right font-medium ${d.Beneficio >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                    {formatCurrency(d.Beneficio)}
                                </TableCell>
                                <TableCell className={`text-right font-semibold ${d.Beneficio_Acumulado >= 0 ? 'text-gray-800' : 'text-red-600'}`}>
                                    {formatCurrency(d.Beneficio_Acumulado)}
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            </div>
        </TabsContent>
         <TabsContent value="kpis">
            <Card>
                <CardHeader>
                    <CardTitle>Indicadores Clave de Rendimiento (KPIs)</CardTitle>
                    <CardDescription>Una lista de métricas esenciales para medir la salud y el éxito de tu negocio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {kpis.map((kpi) => (
                            <AccordionItem value={kpi.id} key={kpi.id}>
                                <AccordionTrigger>{kpi.name}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">{kpi.description}</p>
                                        <div className="p-3 bg-muted/50 rounded-lg">
                                            <p className="text-sm font-semibold">Fórmula:</p>
                                            <p className="text-sm font-mono text-primary">{kpi.formula}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="accounts">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary"/> Catálogo de Cuentas Contables (Esquema de Mayor)</CardTitle>
                    <CardDescription>Visualización de Cuentas T para entender el registro de transacciones mediante cargos (Debe) y abonos (Haber).</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-6">
                        {
                            chartOfAccounts.map(account => {
                                if (account.type === 'MainHeader') {
                                    return (
                                        <div key={account.code} className="mt-6 pt-4 border-t">
                                            <h2 className="text-xl font-bold text-primary tracking-wide">{account.name}</h2>
                                            <p className="text-base text-muted-foreground">{account.description}</p>
                                            <Separator className="mt-2"/>
                                        </div>
                                    )
                                }
                                if (account.type === 'Header') {
                                     return (
                                        <div key={account.code} className="mt-4">
                                            <h3 className="text-lg font-semibold">{account.name}</h3>
                                            <Separator className="mt-1"/>
                                        </div>
                                    )
                                }
                                if (account.type === 'SubHeader') {
                                     return (
                                        <div key={account.code} className="mt-4 ml-4">
                                            <h4 className="text-md font-semibold text-muted-foreground">{account.name}</h4>
                                        </div>
                                    )
                                }
                                if (account.type === 'Account') {
                                    const nature = account.code.startsWith('1') || account.code.startsWith('5') ? 'debit' : 'credit';
                                    return (
                                      <div key={account.code} className="ml-8 pl-4 border-l-2 border-slate-200 py-2">
                                        <TAccountCard name={account.name} note={account.note} nature={nature} />
                                      </div>
                                    )
                                }
                                return null;
                            })
                        }
                   </div>
                </CardContent>
             </Card>
        </TabsContent>
       </Tabs>
    </div>
  );
}

    