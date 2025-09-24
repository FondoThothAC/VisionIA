
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BrainCircuit, File as FileIcon, Loader2, Search } from 'lucide-react';
import { retrieveRelevantInformationFromDocuments } from '@/ai/flows/retrieve-relevant-information-from-documents';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PageHeader from '@/components/page-header';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  query: z.string().min(5, 'Por favor, introduce una consulta más específica.'),
});

type FormData = z.infer<typeof formSchema>;

export default function RetrievalPage() {
  const [retrievedInfo, setRetrievedInfo] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: '' },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const fileToDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  async function onSubmit(values: FormData) {
    if (files.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No hay documentos',
        description: 'Por favor, sube al menos un documento.',
      });
      return;
    }

    setIsLoading(true);
    setRetrievedInfo(null);

    try {
      toast({
        title: 'Analizando Documentos...',
        description: 'La IA está extrayendo información relevante.',
      });

      const documentPromises = files.map(fileToDataURI);
      const documentDataURIs = await Promise.all(documentPromises);

      const result = await retrieveRelevantInformationFromDocuments({
        query: values.query,
        documents: documentDataURIs,
      });

      setRetrievedInfo(result.relevantInformation);
      toast({
        title: '¡Información Recuperada!',
        description: 'La IA ha terminado de analizar tus documentos.',
      });
    } catch (error) {
      console.error('Error recuperando información:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo recuperar la información. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Recuperación de Información Basada en RAG"
        description="Sube tus documentos y haz una pregunta. Nuestra IA encontrará la información más relevante para ti."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Base de Conocimiento</CardTitle>
                <CardDescription>Sube archivos e introduce tu consulta.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormItem>
                  <FormLabel>Subir Documentos</FormLabel>
                  <FormControl>
                    <Input type="file" multiple onChange={handleFileChange} />
                  </FormControl>
                   <FormMessage />
                  <p className="text-xs text-muted-foreground mt-2">
                    Actualmente se admiten formatos de texto sin formato como `.txt`, `.md`, o `.json`. 
                    Si tienes un archivo de Word (`.docx`) o PDF, por favor copia el contenido y pégalo en un archivo `.txt` antes de subirlo.
                  </p>
                  {files.length > 0 && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm font-medium">Archivos seleccionados:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center">
                            <FileIcon className="mr-2 h-4 w-4" />
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </FormItem>

                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tu Pregunta</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: ¿Cuáles son los principales riesgos de mercado mencionados en los informes?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  <Search className="mr-2 h-4 w-4" />
                  {isLoading ? 'Buscando...' : 'Recuperar Información'}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Información Recuperada</CardTitle>
            <CardDescription>La información relevante de tus documentos aparecerá aquí.</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading && (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            )}
            {retrievedInfo && (
              <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-lg">
                <p>{retrievedInfo}</p>
              </div>
            )}
            {!isLoading && !retrievedInfo && (
              <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <BrainCircuit className="h-12 w-12 mb-4" />
                <p>La IA está lista para responder tus preguntas.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
