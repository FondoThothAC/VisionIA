"use client"

import { useState } from "react"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import PageHeader from "@/components/page-header"

const projectionData = [
  { month: "Month 1", revenue: 4000, profit: 2400 },
  { month: "Month 2", revenue: 3000, profit: 1398 },
  { month: "Month 3", revenue: 2000, profit: 9800 },
  { month: "Month 4", revenue: 2780, profit: 3908 },
  { month: "Month 5", revenue: 1890, profit: 4800 },
  { month: "Month 6", revenue: 2390, profit: 3800 },
  { month: "Month 7", revenue: 3490, profit: 4300 },
  { month: "Month 8", revenue: 4000, profit: 2400 },
  { month: "Month 9", revenue: 3000, profit: 1398 },
  { month: "Month 10", revenue: 2000, profit: 9800 },
  { month: "Month 11", revenue: 2780, profit: 3908 },
  { month: "Month 12", revenue: 1890, profit: 4800 },
];

const projectionChartConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--chart-1))" },
  profit: { label: "Profit", color: "hsl(var(--chart-2))" },
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
  profit: { label: "Profit", color: "hsl(var(--chart-1))" },
};

export default function FinancialsPage() {
  const [growth, setGrowth] = useState(10);
  const [price, setPrice] = useState(20);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Financial Modeling"
        description="Generate financial statements, ratios, and charts. Perform what-if analysis to forecast your business's future."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What-If Analysis</CardTitle>
            <CardDescription>Adjust sliders to see how variables impact your projections.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="growth-slider">Monthly Growth Rate</Label>
                <span className="text-sm font-medium">{growth}%</span>
              </div>
              <Slider id="growth-slider" defaultValue={[10]} max={50} step={1} onValueChange={(value) => setGrowth(value[0])} />
            </div>
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="price-slider">Average Price per Unit</Label>
                <span className="text-sm font-medium">${price}</span>
              </div>
              <Slider id="price-slider" defaultValue={[20]} max={100} step={1} onValueChange={(value) => setPrice(value[0])} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Key Ratios</CardTitle>
            <CardDescription>An overview of your business's financial health.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Gross Margin</p>
              <p className="text-2xl font-bold">60%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Net Profit Margin</p>
              <p className="text-2xl font-bold">25%</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Current Ratio</p>
              <p className="text-2xl font-bold">2.5</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">Debt-to-Equity</p>
              <p className="text-2xl font-bold">0.8</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>12-Month Financial Projections</CardTitle>
          <CardDescription>Based on your current assumptions and what-if analysis.</CardDescription>
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
          <CardTitle>Break-Even Analysis (Puerto Rico)</CardTitle>
          <CardDescription>Estimated customers needed to become profitable.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <p className="text-muted-foreground">You need to serve</p>
            <p className="text-5xl font-bold font-headline text-primary">100</p>
            <p className="text-muted-foreground">customers to break even.</p>
          </div>
          <ChartContainer config={breakEvenChartConfig} className="h-80 w-full">
            <ResponsiveContainer>
              <LineChart data={breakEvenData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="customers" type="number" label={{ value: 'Number of Customers', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Profit / Loss ($)', angle: -90, position: 'insideLeft' }} tickFormatter={(value) => `$${value/1000}k`} />
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
