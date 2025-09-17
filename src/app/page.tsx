"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart2,
  FileText,
  Film,
  ImageIcon,
  Library,
  Search,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";

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

const features = [
  {
    title: "Outline Generator",
    description: "AI-powered business plan creation.",
    href: "/outline",
    icon: FileText,
  },
  {
    title: "Document Retrieval",
    description: "Extract insights from your files.",
    href: "/retrieval",
    icon: Search,
  },
  {
    title: "Financials",
    description: "Model and forecast your finances.",
    href: "/financials",
    icon: BarChart2,
  },
  {
    title: "Template Library",
    description: "Browse industry-specific templates.",
    href: "/templates",
    icon: Library,
  },
  {
    title: "Visuals Generator",
    description: "Create images for your concepts.",
    href: "/visuals",
    icon: ImageIcon,
  },
  {
    title: "Video Overview",
    description: "Generate a video summary.",
    href: "/video",
    icon: Film,
  },
];

const chartData = [
  { month: "January", revenue: 1860, expenses: 800 },
  { month: "February", revenue: 3050, expenses: 1200 },
  { month: "March", revenue: 2370, expenses: 1000 },
  { month: "April", revenue: 730, expenses: 500 },
  { month: "May", revenue: 2090, expenses: 1100 },
  { month: "June", revenue: 2140, expenses: 1300 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-2))",
  },
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-full">
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
        <Image
          src="https://picsum.photos/seed/visionary1/1200/400"
          alt="Office collaboration"
          data-ai-hint="office collaboration"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8">
          <h1 className="font-headline text-4xl md:text-6xl font-bold text-white mb-2">
            Welcome to Visionary Ventures
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80">
            Your AI co-pilot for crafting the perfect business plan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">
                {feature.title}
              </CardTitle>
              <feature.icon className="w-6 h-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href={feature.href}>
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>
            Monthly revenue and expenses for the last 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-80 w-full">
            <ResponsiveContainer>
              <BarChart data={chartData}>
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
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
