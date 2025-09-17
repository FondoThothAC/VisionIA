"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";
import BusinessPlanGuideDisplay from './business-plan-guide-display';
import { guide1, guide2, guide3 } from '@/lib/business-plan-guides';

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
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="guide1">Guía de Emprendimiento</TabsTrigger>
                        <TabsTrigger value="guide2">Guía General</TabsTrigger>
                        <TabsTrigger value="guide3">Guía Estándar Global</TabsTrigger>
                    </TabsList>
                    <TabsContent value="guide1">
                        <BusinessPlanGuideDisplay guide={guide1} />
                    </TabsContent>
                    <TabsContent value="guide2">
                        <BusinessPlanGuideDisplay guide={guide2} />
                    </TabsContent>
                     <TabsContent value="guide3">
                        <BusinessPlanGuideDisplay guide={guide3} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
