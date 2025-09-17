
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, ChevronsUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CanvasBlock = ({ title, children, className }: { title: string, children: React.ReactNode, className?: string }) => (
  <Card className={className}>
    <CardHeader className="p-3">
      <CardTitle className="text-base font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-3 pt-0">
      {children}
    </CardContent>
  </Card>
);

export default function BusinessModelCanvasPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div>
            <h1 className="font-headline text-3xl font-bold">Lienzo del Modelo de Negocio</h1>
            <p className="text-muted-foreground">Rellena los 9 bloques para construir tu modelo de negocio.</p>
         </div>
         <div className="flex items-center gap-4 w-full md:w-auto">
            <Select defaultValue="cafe-aroma">
              <SelectTrigger className="w-full md:w-[280px]">
                <ChevronsUpDown className="mr-2 h-4 w-4 opacity-50"/>
                <SelectValue placeholder="Seleccionar proyecto..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cafe-aroma">Proyecto: Café 'Aroma de Montaña'</SelectItem>
                <SelectItem value="moda-sostenible">Proyecto: Moda Sostenible</SelectItem>
                <SelectItem value="app-fitness">Proyecto: App de Fitness</SelectItem>
              </SelectContent>
            </Select>
            <Button>
                <Save className="mr-2 h-4 w-4"/>
                Guardar
            </Button>
         </div>
      </div>

      <div className="grid grid-cols-5 grid-rows-8 gap-4 min-h-[75vh]">
        {/* Fila 1 */}
        <CanvasBlock title="8. Socios Clave" className="col-span-1 row-span-4">
          <Textarea placeholder="¿Quiénes son tus socios y proveedores clave?" className="h-full resize-none"/>
        </CanvasBlock>
        <div className="col-span-1 row-span-4 flex flex-col gap-4">
            <CanvasBlock title="7. Actividades Clave" className="flex-1">
                <Textarea placeholder="¿Qué actividades clave requiere tu propuesta de valor?" className="h-full resize-none"/>
            </CanvasBlock>
            <CanvasBlock title="6. Recursos Clave" className="flex-1">
                <Textarea placeholder="¿Qué recursos clave necesitas?" className="h-full resize-none"/>
            </CanvasBlock>
        </div>
        <CanvasBlock title="2. Propuestas de Valor" className="col-span-1 row-span-4">
          <Textarea placeholder="¿Qué valor entregas al cliente? ¿Qué problema solucionas?" className="h-full resize-none"/>
        </CanvasBlock>
        <div className="col-span-1 row-span-4 flex flex-col gap-4">
            <CanvasBlock title="4. Relación con Clientes" className="flex-1">
                <Textarea placeholder="¿Qué tipo de relación esperas tener con tus clientes?" className="h-full resize-none"/>
            </CanvasBlock>
            <CanvasBlock title="3. Canales" className="flex-1">
                <Textarea placeholder="¿A través de qué canales llegarás a tus clientes?" className="h-full resize-none"/>
            </CanvasBlock>
        </div>
        <CanvasBlock title="1. Segmentos de Mercado" className="col-span-1 row-span-4">
          <Textarea placeholder="¿Para quién estás creando valor?" className="h-full resize-none"/>
        </CanvasBlock>
        
        {/* Fila 2 */}
        <CanvasBlock title="9. Estructura de Costes" className="col-span-2 row-span-4 col-start-1">
            <Textarea placeholder="¿Cuáles son los costos más importantes inherentes a tu modelo de negocio?" className="h-full resize-none"/>
        </CanvasBlock>
        <CanvasBlock title="5. Fuentes de Ingresos" className="col-span-3 row-span-4 col-start-3">
            <Textarea placeholder="¿Por qué valor están dispuestos a pagar tus clientes? ¿Cómo pagarán?" className="h-full resize-none"/>
        </CanvasBlock>
      </div>
    </div>
  );
}
