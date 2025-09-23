
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

type ProductState = {
  name: string;
  description: string;
  valueProposition: string;
  lifecycle: string;
  ip: string;
};

const initialProductState: ProductState = {
    name: "Café de Especialidad 'Aroma de Montaña'",
    description: "Ofrecemos granos de café 100% arábica de origen único, cultivados en las altas montañas de Chiapas. Nuestro proceso de tostado artesanal, realizado en lotes pequeños, garantiza la máxima frescura y resalta las notas de sabor únicas de cada cosecha, que van desde cítricos y florales hasta achocolatados y afrutados. El café se vende en grano o molido según la preferencia del cliente.",
    valueProposition: "A diferencia del café comercial de supermercado, nuestro producto ofrece una experiencia sensorial completa y transparente. Cada bolsa cuenta la historia de la finca y el productor detrás de ella. Nuestra PUV es 'frescura garantizada': tostamos el café bajo demanda, justo antes de enviarlo, asegurando que el cliente reciba un producto en su punto óptimo de sabor, algo que las grandes marcas no pueden igualar.",
    lifecycle: "Actualmente estamos en la versión 1.0 de nuestro empaque y oferta de productos. Para el próximo trimestre, planeamos introducir una línea de 'micro-lotes' de edición limitada con perfiles exóticos. En 6 meses, lanzaremos una versión 2.0 de nuestro empaque, 100% compostable. A largo plazo (1-2 años), exploramos la posibilidad de ofrecer cápsulas compatibles con sistemas populares, pero utilizando nuestro café de alta calidad.",
    ip: "La marca 'Aroma de Montaña' y su logotipo están en proceso de registro ante el IMPI. Los diseños de nuestros empaques son creaciones originales y están protegidos por derechos de autor. No poseemos patentes sobre el proceso, ya que nos basamos en técnicas artesanales tradicionales, pero nuestro 'know-how' y las relaciones exclusivas con los productores son un activo intangible clave."
};


export default function ProductPage() {
    const [product, setProduct] = useState<ProductState>(initialProductState);

    const handleSave = () => {
        console.log("Guardando datos del producto:", product);
        alert("Datos del producto guardados en la consola.");
    }

    const createChangeHandler = <T, K extends keyof T>(setter: React.Dispatch<React.SetStateAction<T>>, field: K) => (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setter(prev => ({...prev, [field]: e.target.value}));
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <PageHeader
                    title="Descripción de Producto o Servicio"
                    description="Detalla qué vendes, qué lo hace especial y cómo evolucionará."
                />
                 <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4"/>
                    Guardar Progreso
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Lienzo del Producto/Servicio</CardTitle>
                    <CardDescription>Utiliza los siguientes campos para construir una descripción completa y atractiva de tu oferta principal.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="product-name">Nombre del Producto o Servicio</Label>
                        <Input id="product-name" value={product.name} onChange={createChangeHandler(setProduct, 'name')} placeholder="Ej. Café de Especialidad 'Aroma de Montaña'" />
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="product-description">Descripción Detallada</Label>
                        <Textarea id="product-description" value={product.description} onChange={createChangeHandler(setProduct, 'description')} placeholder="¿Qué es y cómo funciona? Describe sus características y beneficios clave." rows={5}/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-uvp">Propuesta Única de Valor (PUV)</Label>
                        <Textarea id="product-uvp" value={product.valueProposition} onChange={createChangeHandler(setProduct, 'valueProposition')} placeholder="¿Qué lo hace único, diferente y mejor que las alternativas del mercado?" rows={4}/>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="product-lifecycle">Ciclo de Vida y Futuro del Producto</Label>
                        <Textarea id="product-lifecycle" value={product.lifecycle} onChange={createChangeHandler(setProduct, 'lifecycle')} placeholder="¿Hay planes para futuras versiones, mejoras o nuevos productos/servicios relacionados?" rows={4}/>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="product-ip">Protección y Propiedad Intelectual</Label>
                        <Textarea id="product-ip" value={product.ip} onChange={createChangeHandler(setProduct, 'ip')} placeholder="¿El producto está protegido por patentes, marcas registradas, derechos de autor? ¿Cuál es la estrategia de PI?" rows={3}/>
                    </div>

                </CardContent>
            </Card>
        </div>
    )
}
