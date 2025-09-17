
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/page-header";

export default function SettingsPage() {
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
            Selecciona los modelos de IA para cada tarea específica, distinguiendo entre modelos en la nube (API) y locales.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
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
                    <SelectLabel>Modelos Locales</SelectLabel>
                    <SelectItem value="llama-3-local">Llama 3 (Local)</SelectItem>
                    <SelectItem value="phi-3-local">Phi 3 (Local)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Modelo para generar la misión, visión y estrategias del plan de negocios.
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="finance-model-select">Análisis Financiero</Label>
              <Select defaultValue="finance-specialist-v1">
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
                    <SelectLabel>Modelos Locales</SelectLabel>
                     <SelectItem value="finance-llama-local">Llama 3 (Finanzas Local)</SelectItem>
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
                    <SelectItem value="stable-diffusion-local">Stable Diffusion (Local)</SelectItem>
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
