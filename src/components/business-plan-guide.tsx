"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import BusinessPlanGuideDisplay from './business-plan-guide-display';
import { guide1, guide2 } from '@/lib/business-plan-guides';

export default function BusinessPlanGuide() {
    const [activeTab, setActiveTab] = useState("guide1");

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <BookOpen className="mr-2" />
                    Guías de Plan de Negocios
                </CardTitle>
                <CardDescription>
                    Explora nuestras guías detalladas para construir un plan de negocios sólido.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList>
                        <TabsTrigger value="guide1">Guía de Emprendimiento</TabsTrigger>
                        <TabsTrigger value="guide2">Guía General</TabsTrigger>
                    </TabsList>
                    <TabsContent value="guide1">
                        <BusinessPlanGuideDisplay guide={guide1} />
                    </TabsContent>
                    <TabsContent value="guide2">
                        <BusinessPlanGuideDisplay guide={guide2} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
