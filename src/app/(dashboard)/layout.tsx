import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashbaord-sidebar";

interface Props {
   children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
   return (
      <SidebarProvider>
         <DashboardSidebar />
         <main className="flex flex-col h-screen w-screen bg-muted p-4">
            {children}
         </main>
      </SidebarProvider>
   );
};

export default Layout;
