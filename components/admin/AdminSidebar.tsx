'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { LayoutDashboard, FolderKanban, LayoutTemplate, Images } from 'lucide-react'
import LogoutButton from './LogoutButton'

const navItems = [
  {
    label: 'Genel Bakış',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    label: 'Projeler',
    href: '/admin/projects',
    icon: FolderKanban,
  },
  {
    label: 'Sayfa İçerikleri',
    href: '/admin/sections',
    icon: LayoutTemplate,
  },
  {
    label: 'Galeri',
    href: '/admin/gallery',
    icon: Images,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
        <Link href="/admin" className="text-base font-semibold">
          Admin Panel
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">furkanarslan.dev</p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Yönetim</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-sidebar-border flex flex-col gap-3">
        <Link
          href="/tr"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Siteye Dön
        </Link>
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  )
}