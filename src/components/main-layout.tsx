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
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';

const menuItems = [
  {
    href: '/',
    label: 'Panel Principal',
    icon: LayoutDashboard,
  },
  {
    href: '/outline',
    label: 'Generador de Esquemas',
    icon: FileText,
  },
  {
    href: '/retrieval',
    label: 'Recuperación de Documentos',
    icon: Search,
  },
  {
    href: '/financials',
    label: 'Finanzas',
    icon: BarChart2,
  },
  {
    href: '/templates',
    label: 'Plantillas',
    icon: Library,
  },
  {
    href: '/visuals',
    label: 'Generador de Visuales',
    icon: ImageIcon,
  },
  {
    href: '/video',
    label: 'Resumen en Video',
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

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/50">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
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
        </SidebarContent>
         <SidebarContent className="mt-auto">
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
         </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center p-4 border-b lg:hidden">
            <SidebarTrigger />
            <div className="flex-1 text-center">
                <Logo iconOnly={true} className="inline-flex" />
            </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </SidebarInset>
    </>
  );
}
