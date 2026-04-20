import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 min-w-0">
          <header className="flex items-center h-14 px-4 border-b border-border sticky top-0 bg-background z-10">
            <SidebarTrigger />
          </header>
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}