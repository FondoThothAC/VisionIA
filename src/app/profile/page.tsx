
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageHeader from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Perfil de Usuario"
        description="Gestiona la información de tu cuenta y tus preferencias."
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@robertocelis" />
                    <AvatarFallback>RC</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">Roberto Celis</h2>
                <p className="text-sm text-muted-foreground">Administrador</p>
                 <Button variant="outline" size="sm" className="mt-4">Cambiar Foto</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Información de la Cuenta</CardTitle>
                    <CardDescription>Actualiza los detalles de tu perfil aquí.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre Completo</Label>
                        <Input id="fullName" defaultValue="Roberto Celis" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Dirección de Correo Electrónico</Label>
                        <Input id="email" type="email" defaultValue="roberto.celis@example.com" disabled/>
                         <p className="text-xs text-muted-foreground">El correo electrónico no se puede cambiar.</p>
                    </div>

                    <Separator />
                    
                    <CardTitle className="text-lg">Cambiar Contraseña</CardTitle>
                     <div className="space-y-2">
                        <Label htmlFor="currentPassword">Contraseña Actual</Label>
                        <Input id="currentPassword" type="password" placeholder="••••••••••••" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="newPassword">Nueva Contraseña</Label>
                        <Input id="newPassword" type="password" placeholder="••••••••••••"/>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                        <Input id="confirmPassword" type="password" placeholder="••••••••••••"/>
                    </div>

                     <Button>Guardar Cambios</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
