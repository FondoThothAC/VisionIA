
"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  FileText,
  Film,
  ImageIcon,
  LayoutDashboard,
  Library,
  Search,
  Settings,
  User,
  Users,
  Briefcase,
  Target,
  Telescope,
  BookOpen,
  Package,
  FilePlus2,
  Edit,
  Megaphone,
  ClipboardCheck,
  Flower,
  Feather,
  Box,
  Swords,
  Scaling,
  ChevronDown,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { Button } from './ui/button';

const menuItems = [
  {
    href: '/',
    label: 'Panel Principal',
    icon: LayoutDashboard,
  },
  {
    href: '/nuevo-proyecto',
    label: 'Nuevo Proyecto',
    icon: FilePlus2,
  },
  {
    href: '/outline',
    label: 'Editar Proyecto',
    icon: Edit,
  },
  {
    href: '/guia',
    label: 'Guía del Plan',
    icon: BookOpen,
  },
  {
    href: '/guia-desarrollo',
    label: 'Guía de Desarrollo',
    icon: ClipboardCheck,
  },
  {
    href: '/retrieval',
    label: 'Consulta de Documentos (RAG)',
    icon: Search,
  },
    {
    href: '/clientes',
    label: 'Cliente(s)',
    icon: Users,
  },
  {
    isGroup: true,
    label: 'Diseño del Negocio',
    icon: Briefcase,
    items: [
        { href: '/diseno-negocio/business-model-canvas', label: 'Lienzo de Modelo de Negocio', icon: Box },
        { href: '/diseno-negocio/lean-canvas', label: 'Lean Canvas', icon: Feather },
        { href: '/diseno-negocio/product-canvas', label: 'Product Canvas', icon: Package },
        { href: '/diseno-negocio/flor-servicio', label: 'Flor del Servicio', icon: Flower },
    ]
  },
  {
    isGroup: true,
    label: 'Análisis Estratégico',
    icon: Telescope,
    items: [
        { href: '/analisis-estrategico/foda', label: 'Análisis FODA', icon: Swords },
        { href: '/analisis-estrategico/pestel', label: 'Análisis PESTEL', icon: Telescope },
        { href: '/analisis-estrategico/fpp', label: 'Asignación de Recursos (FPP)', icon: Scaling },
    ]
  },
  {
    href: '/competencia',
    label: 'Competencia',
    icon: Target,
  },
   {
    href: '/producto',
    label: 'Producto o Servicio',
    icon: Package,
  },
  {
    href: '/estrategia-marketing',
    label: 'Estrategia de Marketing',
    icon: Megaphone,
  },
  {
    href: '/financials',
    label: 'Finanzas',
    icon: BarChart2,
  },
  {
    href: '/visuals',
    label: 'Generador de Visuales',
    icon: ImageIcon,
  },
  {
    href: '/video',
    label: 'Pitch de Inversor',
    icon: Film,
  },
];

const secondaryMenuItems = [
    {
    href: '/settings',
    label: 'Configuración',
    icon: Settings,
  },
    {
    href: '/profile',
    label: 'Perfil',
    icon: User,
  },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({...prev, [label]: !prev[label]}));
  }
  
  const renderMenuItem = (item: any) => {
    if (item.isGroup) {
      const isSubmenuActive = item.items.some((subItem: any) => pathname.startsWith(subItem.href));
      const isOpen = openSubmenus[item.label] ?? isSubmenuActive;

      return (
        <SidebarMenuItem key={item.label} className="relative">
          <SidebarMenuButton
            isActive={isSubmenuActive}
            onClick={() => toggleSubmenu(item.label)}
            tooltip={item.label}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
          {isOpen && (
             <SidebarMenuSub>
                {item.items.map((subItem: any) => (
                    <SidebarMenuSubItem key={subItem.href}>
                         <Link href={subItem.href}>
                             <SidebarMenuSubButton isActive={pathname === subItem.href}>
                                <subItem.icon/>
                                <span>{subItem.label}</span>
                            </SidebarMenuSubButton>
                         </Link>
                    </SidebarMenuSubItem>
                ))}
             </SidebarMenuSub>
          )}
        </SidebarMenuItem>
      )
    }

    return (
      <SidebarMenuItem key={item.href}>
        <Link href={item.href}>
          <SidebarMenuButton
            isActive={pathname === item.href}
            tooltip={item.label}
          >
            <item.icon />
            <span>{item.label}</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    );
  }

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/50">
        <SidebarRail />
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(renderMenuItem)}
          </SidebarMenu>
          <div className="mt-auto">
            <SidebarMenu>
                {secondaryMenuItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                        <Link href={item.href}>
                        <SidebarMenuButton
                            isActive={pathname === item.href}
                            tooltip={item.label}
                        >
                            <item.icon />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    ))}
            </SidebarMenu>
          </div>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                 <Logo iconOnly={true} className="lg:hidden" />
            </div>

            <div className="flex items-center gap-4">
                <Button variant="outline" className="rounded-full border-2 border-primary/50 font-bold text-primary hover:bg-primary/10 hover:text-primary pl-6 pr-5 relative -top-1 -mr-2 shadow-sm">
                    Proyecto
                    <div className="absolute top-0 right-0 -mr-px -mt-px w-3 h-3 border-l-2 border-t-2 border-primary/50 rounded-tl-sm" />
                    <div className="absolute bottom-0 right-0 -mr-px -mb-px w-3 h-3 border-l-2 border-t-2 border-primary/50 transform -rotate-90" />
                    <div className="absolute top-0 left-0 -ml-px -mt-px w-3 h-3 border-r-2 border-b-2 border-primary/50 transform -rotate-90" />
                     <div className="absolute bottom-0 left-0 -ml-px -mb-px w-3 h-3 border-r-2 border-b-2 border-primary/50" />
                </Button>
                 <Button>
                    Guardar y Continuar
                </Button>
            </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </>
  );
}

    