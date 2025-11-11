
"use client";

import { useState } from 'react';
import { BrainCircuit, FileImage, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/page-header';
import Image from 'next/image';
import { Textarea } from '@/components/ui/textarea';

export default function ImageAnalysisPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setAnalysis(null);
    }
  };

  const handleAnalysis = async () => {
    if (!file) return;

    setIsLoading(true);
    setAnalysis(null);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysis("Análisis simulado de la imagen: Se detecta un gráfico de barras mostrando un crecimiento del 25% en ventas trimestrales. Los colores predominantes son azul y verde, sugiriendo una connotación positiva. El texto es claro y legible.");
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Análisis de Imágenes con IA"
        description="Sube una imagen (un gráfico, un boceto, un producto) y la IA la analizará por ti."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Sube tu Imagen</CardTitle>
            <CardDescription>Selecciona el archivo de imagen que quieres analizar.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Input type="file" accept="image/*" onChange={handleFileChange} />
             <div className="aspect-video w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50">
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Vista previa de la imagen"
                  width={600}
                  height={400}
                  className="rounded-md object-contain h-full w-full"
                />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <FileImage className="h-12 w-12 mx-auto mb-2" />
                  <p>La vista previa de tu imagen aparecerá aquí.</p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalysis} disabled={!file || isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BrainCircuit className="mr-2 h-4 w-4" />
              )}
              Analizar Imagen
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Resultados del Análisis</CardTitle>
                <CardDescription>La interpretación de la IA sobre tu imagen.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea 
                  className="h-full min-h-[300px]"
                  value={isLoading ? "Analizando..." : analysis || "El análisis de la IA aparecerá aquí."}
                  readOnly
                />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
