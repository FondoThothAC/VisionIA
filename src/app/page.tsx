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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";


const projects = [
    {
        name: "Plan de Negocio - Café 'Aroma de Montaña'",
        lead: "Ana Gómez",
        lastModified: "Hace 2 horas",
        progress: 75,
        status: "En progreso",
    },
    {
        name: "Estudio de Mercado - Moda Sostenible",
        lead: "Carlos Ruiz",
        lastModified: "Hace 1 día",
        progress: 40,
        status: "En progreso",
    },
    {
        name: "Proyecciones Financieras - App de Fitness",
        lead: "Sofía Lara",
        lastModified: "Hace 3 días",
        progress: 90,
        status: "Revisión",
    },
    {
        name: "Estrategia de Marketing - Servicios de Consultoría",
        lead: "Javier Torres",
        lastModified: "Hace 5 días",
        progress: 100,
        status: "Completado",
    },
];

const ganttData = [
  { project: "Café 'Aroma de Montaña'", "Investigación": 2, "Escritura": 4, "Finanzas": 3, "Revisión": 1, },
  { project: "Moda Sostenible", "Investigación": 3, "Escritura": 2, "Finanzas": 1, "Revisión": 0, },
  { project: "App de Fitness", "Investigación": 1, "Escritura": 3, "Finanzas": 4, "Revisión": 2, },
  { project: "Consultoría", "Investigación": 2, "Escritura": 5, "Finanzas": 3, "Revisión": 2, },
];

const chartConfig = {
  "Investigación": { label: "Investigación", color: "hsl(var(--chart-1))" },
  "Escritura": { label: "Escritura", color: "hsl(var(--chart-2))" },
  "Finanzas": { label: "Finanzas", color: "hsl(var(--chart-3))" },
  "Revisión": { label: "Revisión", color: "hsl(var(--chart-4))" },
};


export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">Panel Principal</h1>
          <p className="text-muted-foreground">Bienvenido de nuevo, aquí tienes un resumen de tu actividad.</p>
        </div>
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
                 <Button variant="secondary" size="lg" className="w-full md:w-auto">
                    <FilePlus2 className="mr-2"/>
                    Iniciar nuevo plan
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
            <div className="text-2xl font-bold">3</div>
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
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">3 para esta semana</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Proyectos Recientes</CardTitle>
                    <CardDescription>Un vistazo a los últimos planes de negocio en los que has trabajado.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre del Proyecto</TableHead>
                                <TableHead>Responsable</TableHead>
                                <TableHead>Última Modificación</TableHead>
                                <TableHead>Progreso</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.name}>
                                    <TableCell className="font-medium">{project.name}</TableCell>
                                    <TableCell>{project.lead}</TableCell>
                                    <TableCell className="text-muted-foreground">{project.lastModified}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress value={project.progress} className="w-24"/>
                                            <span className="text-xs text-muted-foreground">{project.progress}%</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
