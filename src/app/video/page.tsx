import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Wand2 } from "lucide-react";
import PageHeader from "@/components/page-header";

export default function VideoPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Generación de Resumen en Video"
        description="Crea automáticamente un atractivo resumen en video de tu plan de negocios. Perfecto para presentaciones a inversores y marketing."
      />

      <Card>
        <CardHeader>
          <CardTitle>Genera tu Video</CardTitle>
          <CardDescription>Haz clic en el botón de abajo para iniciar el proceso de generación de video.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-80 bg-muted/50 rounded-lg border-2 border-dashed">
            <Film className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">Tu video generado aparecerá aquí.</p>
            <Button>
              <Wand2 className="mr-2 h-4 w-4" />
              Generar Video
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
