
"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
  const [apiKeys, setApiKeys] = useState({
    inegi: '',
    statista: '',
    itc: '',
    wco: '',
    alphaVantage: '',
  });

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setApiKeys(prev => ({...prev, [name]: value}));
  }

  const handleSaveApiKeys = () => {
    // In a real app, you'd save these to a secure backend or local storage.
    // For this prototype, we'll just log them to the console and update process.env if possible.
    // NOTE: Client-side process.env updates are not standard and usually don't persist.
    // This is for demonstration; a real implementation would use a backend service.
    if (typeof process !== 'undefined' && process.env) {
      if(apiKeys.inegi) (process.env as any).INEGI_API_TOKEN = apiKeys.inegi;
      if(apiKeys.statista) (process.env as any).STATISTA_API_TOKEN = apiKeys.statista;
      if(apiKeys.alphaVantage) (process.env as any).ALPHA_VANTAGE_API_TOKEN = apiKeys.alphaVantage;
    }
    console.log("Saving API Keys. Note: These are set for the current session only.", apiKeys);
    alert("API Keys guardadas para la sesión actual (ver consola). En una app real, esto sería persistente y seguro.");
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLocalTextModels(prev => prev.map(m => m.id === 'llama-3-local' ? { ...m, detected: true } : m));
      setLocalImageModels(prev => prev.map(m => m.id === 'stable-diffusion-local' ? { ...m, detected: true } : m));
      setLocalFinanceModels(prev => prev.map(m => m.id === 'finbert-local' ? { ...m, detected: true } : m));
      setIsDetecting(false);
    }, 2000);

    const savedInegiKey = typeof process !== 'undefined' ? process.env.INEGI_API_TOKEN || '' : '';
    if (savedInegiKey) {
        setApiKeys(prev => ({...prev, inegi: savedInegiKey}));
    }
    const savedAlphaVantageKey = typeof process !== 'undefined' ? process.env.ALPHA_VANTAGE_API_TOKEN || '' : '';
    if (savedAlphaVantageKey) {
        setApiKeys(prev => ({...prev, alphaVantage: savedAlphaVantageKey}));
    }

    return () => clearTimeout(timer);
  }, []);

  const renderModelSelect = (
    label: string, 
    defaultValue: string, 
    cloudModels: {value: string, label: string}[],
    localModels: LocalModel[],
    localLabel: string
  ) => {
    const localModelItems = localModels
      .filter(m => m.detected)
      .map(model => (
        <SelectItem key={model.id} value={model.id}>
          <div className="flex items-center justify-between w-full">
            <span>{model.name}</span>
            <span className="text-xs text-green-500">Detectado</span>
          </div>
        </SelectItem>
      ));

    if (isDetecting) {
      return <Skeleton className="h-10 w-full" />;
    }

    return (
      <Select defaultValue={defaultValue}>
        <SelectTrigger>
          <SelectValue placeholder="Selecciona un modelo" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Modelos en la Nube (API)</SelectLabel>
            {cloudModels.map(model => (
              <SelectItem key={model.value} value={model.value}>{model.label}</SelectItem>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>{localLabel}</SelectLabel>
            {localModelItems.length > 0 ? (
              localModelItems
            ) : (
              <SelectItem value="no-local" disabled>No se detectaron modelos locales</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  const renderApiInput = (id: keyof typeof apiKeys, label: string, description: string) => {
      const isConnected = !!apiKeys[id];
      return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
            <div className="flex-grow">
                <Label htmlFor={`api-${id}`} className="font-semibold">{label}</Label>
                <p className="text-xs text-muted-foreground">{description}</p>
            </div>
            <div className="flex w-full sm:w-auto flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <Input 
                    id={`api-${id}`} 
                    name={id}
                    placeholder="Introduce tu API Key..." 
                    className="w-full sm:w-64"
                    value={apiKeys[id]}
                    onChange={handleApiKeyChange}
                    type="password"
                />
                 <Badge variant={isConnected ? "default" : "destructive"} className="h-fit py-1 justify-center">
                    {isConnected ? 'Conectado' : 'No Conectado'}
                </Badge>
            </div>
        </div>
      );
  }


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
              {renderModelSelect(
                "Contenido y Estrategia",
                "gemini-1.5-pro",
                [
                  { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
                  { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
                  { value: "gpt-4o", label: "GPT-4o" },
                  { value: "claude-3-opus", label: "Claude 3 Opus" },
                ],
                localTextModels,
                "Modelos Locales (Ollama)"
              )}
              <p className="text-sm text-muted-foreground">
                Modelo para generar la misión, visión y estrategias del plan de negocios.
              </p>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="finance-model-select">Análisis Financiero</Label>
              {renderModelSelect(
                "Análisis Financiero",
                "finbert-local",
                [
                  { value: "finance-specialist-v1", label: "Especialista Financiero v1" },
                  { value: "gemini-1.5-pro-finance", label: "Gemini 1.5 Pro (Finanzas)" },
                ],
                localFinanceModels,
                "Modelos Locales (Ollama)"
              )}
               <p className="text-sm text-muted-foreground">
                Modelo especializado en proyecciones y análisis financieros.
              </p>
            </div>
             <div className="grid gap-3">
              <Label htmlFor="image-model-select">Generación de Imágenes</Label>
              {renderModelSelect(
                "Generación de Imágenes",
                "imagen-3",
                [
                  { value: "imagen-3", label: "Imagen 3" },
                  { value: "dall-e-3", label: "DALL-E 3" },
                  { value: "midjourney-v6", label: "Midjourney v6" },
                ],
                localImageModels,
                "Modelos Locales"
              )}
               <p className="text-sm text-muted-foreground">
                Modelo para crear imágenes y conceptos visuales.
              </p>
            </div>
             <div className="grid gap-3">
              <Label htmlFor="video-model-select">Generación de Video y Audio</Label>
              {renderModelSelect(
                "Generación de Video y Audio",
                "veo",
                [
                  { value: "veo", label: "Veo" },
                  { value: "sora", label: "Sora" },
                ],
                localVideoModels,
                "Modelos Locales"
              )}
               <p className="text-sm text-muted-foreground">
                Modelo para generar resúmenes en video con narración.
              </p>
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Fuentes de Datos y APIs</CardTitle>
            <CardDescription>
                Conecta la aplicación a fuentes de datos externas para enriquecer tu análisis de mercado y financiero. Las claves se guardan solo para tu sesión actual.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos de Mercado Nacional</h3>
                {renderApiInput('inegi', 'API de INEGI (DENUE)', 'Datos demográficos y de unidades económicas de México.')}
                {renderApiInput('statista', 'API de Statista', 'Estadísticas y reportes de industria globales.')}
            </div>
            <Separator />
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos de Comercio Internacional</h3>
                {renderApiInput('itc', 'API de ITC (Market Access Map)', 'Aranceles, acuerdos comerciales y estadísticas de importación/exportación.')}
                {renderApiInput('wco', 'API de WCO (Trade)', 'Clasificación arancelaria (HS Code) y datos de aduanas.')}
            }
            </div>
            <Separator />
             <div className="space-y-4">
                <h3 className="font-semibold text-lg">Datos Financieros</h3>
                {renderApiInput('alphaVantage', 'API de Alpha Vantage', 'Datos de mercados de valores y tipos de cambio.')}
            </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSaveApiKeys}>Guardar Claves de API para la Sesión</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
