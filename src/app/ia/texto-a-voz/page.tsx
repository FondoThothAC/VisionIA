
"use client";

import { useState } from 'react';
import { Loader2, Play, Voicemail, Wand2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import PageHeader from "@/components/page-header";
import { Label } from '@/components/ui/label';

export default function TextToSpeechPage() {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [script, setScript] = useState("Hola, bienvenido a Emprendimientos Visionarios. Estoy aquí para ayudarte a darle voz a tus ideas.");

  const handleGenerateSpeech = async () => {
    if (!script.trim()) return;

    setIsLoading(true);
    setAudioUrl(null);
    
    // Simulate AI TTS generation
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // In a real app, this would be a data URI from a Genkit flow
    setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Generador de Texto a Voz"
        description="Convierte tus guiones, notas o cualquier texto en audio de alta calidad con voces de IA."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Introduce tu Texto</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <Label htmlFor="script-input">Guion para convertir a audio</Label>
            <Textarea
              id="script-input"
              className="h-full min-h-[250px]"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Escribe el texto que quieres convertir a voz aquí..."
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateSpeech} disabled={!script.trim() || isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Generar Audio
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Audio Generado</CardTitle>
                <CardDescription>Escucha el resultado de la conversión.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50 p-4">
                {isLoading && (
                    <div className="flex flex-col items-center text-center text-muted-foreground">
                        <Loader2 className="h-12 w-12 animate-spin mb-4" />
                        <p>Generando audio...</p>
                    </div>
                )}
                {!isLoading && audioUrl && (
                    <div className="w-full space-y-4">
                        <p className="text-sm text-center text-muted-foreground">¡Tu audio está listo!</p>
                        <audio controls src={audioUrl} className="w-full">
                            Tu navegador no soporta el elemento de audio.
                        </audio>
                    </div>
                )}
                {!isLoading && !audioUrl && (
                    <div className="text-center text-muted-foreground">
                        <Voicemail className="h-12 w-12 mx-auto mb-2" />
                        <p>Tu audio aparecerá aquí.</p>
                    </div>
                )}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
