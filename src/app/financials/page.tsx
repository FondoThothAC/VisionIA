"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import PageHeader from "@/components/page-header"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const projectionData = [
  { month: "Mes 1", revenue: 4000, profit: 2400 },
  { month: "Mes 2", revenue: 3000, profit: 1398 },
  { month: "Mes 3", revenue: 2000, profit: 9800 },
  { month: "Mes 4", revenue: 2780, profit: 3908 },
  { month: "Mes 5", revenue: 1890, profit: 4800 },
  { month: "Mes 6", revenue: 2390, profit: 3800 },
  { month: "Mes 7", revenue: 3490, profit: 4300 },
  { month: "Mes 8", revenue: 4000, profit: 2400 },
  { month: "Mes 9", revenue: 3000, profit: 1398 },
  { month: "Mes 10", revenue: 2000, profit: 9800 },
  { month: "Mes 11", revenue: 2780, profit: 3908 },
  { month: "Mes 12", revenue: 1890, profit: 4800 },
];

const projectionChartConfig = {
  revenue: { label: "Ingresos", color: "hsl(var(--chart-1))" },
  profit: { label: "Beneficio", color: "hsl(var(--chart-2))" },
};

const breakEvenData = [
  { customers: 0, profit: -5000 },
  { customers: 50, profit: -2500 },
  { customers: 100, profit: 0 },
  { customers: 150, profit: 2500 },
  { customers: 200, profit: 5000 },
  { customers: 250, profit: 7500 },
];

const breakEvenChartConfig = {
  profit: { label: "Beneficio", color: "hsl(var(--chart-1))" },
};

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


export default function FinancialsPage() {
  const [growth, setGrowth] = useState(10);
  const [price, setPrice] = useState(20);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Modelado Financiero"
        description="Genera estados financieros, ratios y gráficos. Realiza análisis 'what-if' para pronosticar el futuro de tu negocio."
      />

      <Card>
        <CardHeader>
          <CardTitle>Análisis What-If</CardTitle>
          <CardDescription>Ajusta los deslizadores para ver cómo las variables impactan tus proyecciones.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="growth-slider">Tasa de Crecimiento Mensual</Label>
                <span className="text-sm font-medium">{growth}%</span>
              </div>
              <Slider id="growth-slider" defaultValue={[10]} max={50} step={1} onValueChange={(value) => setGrowth(value[0])} />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="price-slider">Precio Promedio por Unidad</Label>
                <span className="text-sm font-medium">${price}</span>
              </div>
              <Slider id="price-slider" defaultValue={[20]} max={100} step={1} onValueChange={(value) => setPrice(value[0])} />
            </div>
          </div>
        </CardContent>
      </Card>
      
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


      <Card>
        <CardHeader>
          <CardTitle>Proyecciones Financieras a 12 Meses</CardTitle>
          <CardDescription>Basado en tus suposiciones actuales y análisis what-if.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={projectionChartConfig} className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={projectionData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Análisis de Punto de Equilibrio</CardTitle>
          <CardDescription>Clientes estimados necesarios para ser rentable.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="text-muted-foreground">Necesitas atender a</p>
            <p className="text-5xl font-bold font-headline text-primary">100</p>
            <p className="text-muted-foreground">clientes para alcanzar el punto de equilibrio.</p>
          </div>
          <ChartContainer config={breakEvenChartConfig} className="h-80 w-full">
            <ResponsiveContainer>
              <LineChart data={breakEvenData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customers" type="number" label={{ value: 'Número de Clientes', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Beneficio / Pérdida ($)', angle: -90, position: 'insideLeft' }} tickFormatter={(value) => `$${value/1000}k`} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="profit" stroke="var(--color-profit)" strokeWidth={2} dot={{r: 4, fill: "var(--color-profit)"}} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
