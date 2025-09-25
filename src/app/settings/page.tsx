
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

type LocalModel = {
  id: string;
  name: string;
  detected: boolean;
};

export default function SettingsPage() {
  const [localTextModels, setLocalTextModels] = useState<LocalModel[]>([
    { id: 'llama-3-local', name: 'Llama 3 (Local)', detected: false },
    { id: 'phi-3-local', name: 'Phi 3 (Local)', detected: false },
  ]);
  const [localFinanceModels, setLocalFinanceModels] = useState<LocalModel[]>([
     { id: 'finance-llama-local', name: 'Finance-Llama (Local)', detected: false },
     { id: 'finbert-local', name: 'FinBERT (Local)', detected: false },
  ]);
  const [localImageModels, setLocalImageModels] = useState<LocalModel[]>([
    { id: 'stable-diffusion-local', name: 'Stable Diffusion (Local)', detected: false },
  ]);
  const [localVideoModels, setLocalVideoModels] = useState<LocalModel[]>([
    { id: 'local-video-ollama', name: 'Modelo de Video Local (Ollama)', detected: false },
  ]);

  const [isDetecting, setIsDetecting] = useState(true);

  useEffect(() => {
    // Simula la detección de modelos locales (como Ollama) con un retraso.
    // En una implementación real, aquí harías una llamada a un endpoint local.
    const timer = setTimeout(() => {
      // Simulemos que detectamos Llama 3 y Stable Diffusion en el servidor local.
      setLocalTextModels(prev => prev.map(m => m.id === 'llama-3-local' ? { ...m, detected: true } : m));
      setLocalImageModels(prev => prev.map(m => m.id === 'stable-diffusion-local' ? { ...m, detected: true } : m));
      
      // Simulamos que FinBERT está disponible localmente
      setLocalFinanceModels(prev => prev.map(m => m.id === 'finbert-local' ? { ...m, detected: true } : m));

      setIsDetecting(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderLocalModels = (models: LocalModel[]) => {
    if (isDetecting) {
      return <Skeleton className="h-8 w-full rounded-md" />;
    }
    
    if (models.every(m => !m.detected)) {
        return (
             <SelectItem value="no-local-models" disabled>
                No se detectaron modelos locales
            </SelectItem>
        )
    }

    return models.map(model => (
      <SelectItem key={model.id} value={model.id} disabled={!model.detected}>
        <div className="flex items-center justify-between w-full">
          <span>{model.name}</span>
          {model.detected && <span className="text-xs text-green-500">Detectado</span>}
        </div>
      </SelectItem>
    ));
  };


  return (
    <div className="space-y-8">
      <PageHeader
        title="Configuración"
        description="Gestiona las preferencias de idioma y la configuración del modelo de IA."
      />

      <Card>
        <CardHeader>
          <CardTitle>Preferencias de Idioma</CardTitle>
          <CardDescription>
            Elige el idioma de la interfaz de la aplicación.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 max-w-sm">
            <Label htmlFor="language-select">Idioma</Label>
            <Select defaultValue="es">
              <SelectTrigger id="language-select">
                <SelectValue placeholder="Selecciona un idioma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">Inglés</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
          <CardTitle>Configuración del Modelo de IA</CardTitle>
          <CardDescription>
            Selecciona los modelos de IA para cada tarea, incluyendo modelos locales auto-hospedados (ej. con Ollama).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8 md:grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="text-model-select">Contenido y Estrategia</Label>
              <Select defaultValue="gemini-1.5-pro">
                <SelectTrigger id="text-model-select">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modelos en la Nube (API)</SelectLabel>
                    <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                    <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash</SelectItem>
                    <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Modelos Locales (Ollama)</SelectLabel>
                    {renderLocalModels(localTextModels)}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Modelo para generar la misión, visión y estrategias del plan de negocios.
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="finance-model-select">Análisis Financiero</Label>
              <Select defaultValue="finbert-local">
                <SelectTrigger id="finance-model-select">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                   <SelectGroup>
                    <SelectLabel>Modelos en la Nube (API)</SelectLabel>
                    <SelectItem value="finance-specialist-v1">Especialista Financiero v1</SelectItem>
                    <SelectItem value="gemini-1.5-pro-finance">Gemini 1.5 Pro (Finanzas)</SelectItem>
                  </SelectGroup>
                   <SelectGroup>
                    <SelectLabel>Modelos Locales (Ollama)</SelectLabel>
                     {renderLocalModels(localFinanceModels)}
                  </SelectGroup>
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground">
                Modelo especializado en proyecciones y análisis financieros.
              </p>
            </div>
             <div className="grid gap-3">
              <Label htmlFor="image-model-select">Generación de Imágenes</Label>
              <Select defaultValue="imagen-3">
                <SelectTrigger id="image-model-select">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modelos en la Nube (API)</SelectLabel>
                    <SelectItem value="imagen-3">Imagen 3</SelectItem>
                    <SelectItem value="dall-e-3">DALL-E 3</SelectItem>
                    <SelectItem value="midjourney-v6">Midjourney v6</SelectItem>
                  </SelectGroup>
                   <SelectGroup>
                    <SelectLabel>Modelos Locales</SelectLabel>
                    {renderLocalModels(localImageModels)}
                  </SelectGroup>
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground">
                Modelo para crear imágenes y conceptos visuales.
              </p>
            </div>
             <div className="grid gap-3">
              <Label htmlFor="video-model-select">Generación de Video y Audio</Label>
              <Select defaultValue="veo">
                <SelectTrigger id="video-model-select">
                  <SelectValue placeholder="Selecciona un modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Modelos en la Nube (API)</SelectLabel>
                    <SelectItem value="veo">Veo</SelectItem>
                    <SelectItem value="sora">Sora</SelectItem>
                  </SelectGroup>
                   <SelectGroup>
                    <SelectLabel>Modelos Locales</SelectLabel>
                    {renderLocalModels(localVideoModels)}
                  </SelectGroup>
                </SelectContent>
              </Select>
               <p className="text-sm text-muted-foreground">
                Modelo para generar resúmenes en video con narración.
              </p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}

    