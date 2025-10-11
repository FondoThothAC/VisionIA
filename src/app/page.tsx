
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  Bell,
  CheckCircle2,
  ChevronDown,
  FilePlus2,
  Filter,
  FolderKanban,
  PlusCircle,
  Search,
  Settings,
  Flag,
  ListTodo,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";


const milestones = [
    {
        name: "Validación del Modelo de Negocio (MVP)",
        date: "30 Sep, 2024",
        status: "Completado",
    },
    {
        name: "Desarrollo del Plan Financiero Detallado",
        date: "15 Oct, 2024",
        status: "En progreso",
    },
     {
        name: "Registro de Marca y Aspectos Legales",
        date: "25 Oct, 2024",
        status: "En progreso",
    },
    {
        name: "Asegurar Ronda de Financiación Semilla ($50k)",
        date: "15 Nov, 2024",
        status: "Pendiente",
    },
    {
        name: "Lanzamiento Beta al Público",
        date: "01 Dic, 2024",
        status: "Pendiente",
    },
];

const tasks = [
    { id: "task1", label: "Finalizar el análisis de la competencia.", done: true },
    { id: "task2", label: "Definir la estrategia de precios para el plan de suscripción.", done: true },
    { id: "task3", label: "Crear proyecciones de flujo de efectivo para el Año 1.", done: false },
    { id: "task4", label: "Diseñar el borrador del logo y la identidad visual.", done: false },
    { id: "task5", label: "Contactar a 3 posibles proveedores de empaques.", done: false },
]

const ganttData = [
  { project: "Café 'Aroma de Montaña'", "Investigación": 2, "Escritura": 4, "Finanzas": 3, "Revisión": 1, },
  { project: "App de Fitness", "Investigación": 1, "Escritura": 3, "Finanzas": 4, "Revisión": 2, },
  { project: "Moda Sostenible", "Investigación": 3, "Escritura": 2, "Finanzas": 1, "Revisión": 0, },
  { project: "Consultoría", "Investigación": 2, "Escritura": 5, "Finanzas": 3, "Revisión": 2, },
];

const chartConfig = {
  "Investigación": { label: "Investigación", color: "hsl(var(--chart-1))" },
  "Escritura": { label: "Escritura", color: "hsl(var(--chart-2))" },
  "Finanzas": { label: "Finanzas", color: "hsl(var(--chart-3))" },
  "Revisión": { label: "Revisión", color: "hsl(var(--chart-4))" },
};

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Completado":
            return "default";
        case "En progreso":
            return "secondary";
        case "Pendiente":
            return "outline";
        default:
            return "outline";
    }
}


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <PageHeader 
          title="Panel Principal"
          description="Bienvenido de nuevo, aquí tienes un resumen de tu actividad."
        />
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@robertocelis" />
                <AvatarFallback>RC</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-sm font-medium">Roberto Celis</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
           </div>
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex flex-col justify-between bg-primary text-primary-foreground">
            <CardHeader>
                <CardTitle>Crear Nuevo Proyecto</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                    Comienza desde cero con un nuevo plan de negocios.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Button asChild variant="secondary" size="lg" className="w-full md:w-auto">
                    <Link href="/nuevo-proyecto">
                        <FilePlus2 className="mr-2"/>
                        Iniciar nuevo plan
                    </Link>
                </Button>
            </CardContent>
        </Card>
         <Card className="flex flex-col justify-between">
            <CardHeader>
                <CardTitle>Continuar "Plan de Negocio - Café 'Aroma de Montaña'"</CardTitle>
                <CardDescription>
                    Retoma donde lo dejaste en tu último proyecto editado.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <Button variant="outline" size="lg" className="w-full md:w-auto">
                    <ArrowRight className="mr-2"/>
                    Continuar proyecto
                </Button>
            </CardContent>
        </Card>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Activos</CardTitle>
            <FolderKanban className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Proyectos Completados</CardTitle>
            <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+1 este mes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">3 para esta semana</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Milestones & Tasks */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Flag /> Hitos del Proyecto</CardTitle>
                    <CardDescription>Las grandes metas que marcan el progreso de tu plan.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Hito</TableHead>
                                <TableHead>Fecha Límite</TableHead>
                                <TableHead className="text-right">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {milestones.map((milestone) => (
                                <TableRow key={milestone.name}>
                                    <TableCell className="font-medium">{milestone.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{milestone.date}</TableCell>
                                    <TableCell className="text-right">
                                       <Badge variant={getStatusBadgeVariant(milestone.status)}>{milestone.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ListTodo /> Tareas Pendientes</CardTitle>
                    <CardDescription>Las acciones inmediatas para avanzar en tu proyecto.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {tasks.map((task) => (
                        <div key={task.id} className="flex items-center space-x-3">
                            <Checkbox id={task.id} checked={task.done} />
                            <Label htmlFor={task.id} className={cn("text-sm", task.done && "line-through text-muted-foreground")}>
                                {task.label}
                            </Label>
                        </div>
                    ))}
                     <Button variant="outline" size="sm" className="w-full mt-4">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Añadir Tarea
                    </Button>
                </CardContent>
            </Card>
        </div>


        {/* Gantt Chart Simulation */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle>Cronograma de Proyectos</CardTitle>
                    <CardDescription>Distribución de tiempo por fase (en semanas).</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="h-80 w-full">
                        <ResponsiveContainer>
                        <BarChart data={ganttData} layout="vertical" stackOffset="expand">
                            <CartesianGrid horizontal={false} />
                            <YAxis
                                dataKey="project"
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                fontSize={12}
                                width={110}
                            />
                            <XAxis type="number" hide={true}/>
                             <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                                />
                            <Legend contentStyle={{fontSize: 12}}/>
                            <Bar dataKey="Investigación" stackId="a" fill="var(--color-Investigación)" radius={[4, 0, 0, 4]}/>
                            <Bar dataKey="Escritura" stackId="a" fill="var(--color-Escritura)" />
                            <Bar dataKey="Finanzas" stackId="a" fill="var(--color-Finanzas)" />
                            <Bar dataKey="Revisión" stackId="a" fill="var(--color-Revisión)" radius={[0, 4, 4, 0]}/>
                        </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
