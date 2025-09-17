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
} from 'lucide-react';

import {
  SidebarProvider,
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
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/outline',
    label: 'Outline Generator',
    icon: FileText,
  },
  {
    href: '/retrieval',
    label: 'Document Retrieval',
    icon: Search,
  },
  {
    href: '/financials',
    label: 'Financials',
    icon: BarChart2,
  },
  {
    href: '/templates',
    label: 'Templates',
    icon: Library,
  },
  {
    href: '/visuals',
    label: 'Visuals Generator',
    icon: ImageIcon,
  },
  {
    href: '/video',
    label: 'Video Overview',
    icon: Film,
  },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="border-r border-sidebar-border/50">
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
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
    </SidebarProvider>
  );
}
