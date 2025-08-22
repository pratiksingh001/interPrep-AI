import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashbaord-sidebar";
import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";

interface Props {
   children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
   return (
      <div className="min-h-screen bg-black">
         <SidebarProvider>
            <DashboardSidebar />
            <main className="flex flex-col h-screen w-screen bg-black">
               <DashboardNavbar />
               <div className="flex-1 relative bg-black">{children}</div>
            </main>
         </SidebarProvider>
      </div>
   );
};

export default Layout;
