
"use client";

import { useState } from 'react';
import { Globe, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/page-header';
import { Textarea } from '@/components/ui/textarea';

export default function DataSearchPage() {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);

    // Simulate AI-powered search
    await new Promise(resolve => setTimeout(resolve, 1500));

    setResult(`Resultado simulado para: "${query}".\n\nSegún datos de mercado, el sector de cafeterías de especialidad ha crecido un 12% anual en México durante los últimos 3 años. El precio promedio para un café de origen único es de $120 MXN por 250g.`);
    setIsLoading(false);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Búsqueda y Datos Externos"
        description="Utiliza esta herramienta para hacer preguntas que requieran datos del mundo real, como análisis de mercado, estadísticas o información de competidores."
      />
      <Card>
        <CardHeader>
          <CardTitle>Consulta de Datos</CardTitle>
          <CardDescription>
            La IA utilizará herramientas (como Google Search o APIs de datos) para encontrar la mejor respuesta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="Ej: ¿Cuál es el tamaño del mercado de café de especialidad en México?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={!query.trim() || isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Buscar
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
          <CardHeader>
              <CardTitle>Resultados de la Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="min-h-[200px] rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50 p-4">
                {isLoading ? (
                    <div className="flex flex-col items-center text-center text-muted-foreground">
                        <Loader2 className="h-10 w-10 animate-spin mb-4" />
                        <p>Buscando en fuentes de datos externas...</p>
                    </div>
                ) : result ? (
                     <Textarea 
                        className="h-full min-h-[200px] bg-background"
                        value={result}
                        readOnly
                      />
                ) : (
                    <div className="text-center text-muted-foreground">
                        <Globe className="h-12 w-12 mx-auto mb-2" />
                        <p>Los resultados de tu búsqueda aparecerán aquí.</p>
                    </div>
                )}
              </div>
          </CardContent>
      </Card>
    </div>
  );
}
