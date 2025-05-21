
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/comps_ui/app-sidebar";
import { Menu } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
        <SidebarProvider className="flex justify-start items-start">
          <AppSidebar />
          <SidebarTrigger className="not-md:hidden" />
          <section className="md:hidden bg-neutral-950 text-white overflow-hidden h-full  flex flex-col  flex-1/4 w-60 absolute top-0 right-0">
            <div className="flex justify-between">
              <span></span>
              <Menu className="m-2">close</Menu>
            </div>
            <div>
              <p className="p-2 font-bold text-leading">Link 1</p>
              <p className="p-2 font-bold text-leading">Link 2</p>
              <p className="p-2 font-bold text-leading">Link 3</p>
              <p className="p-2 font-bold text-leading">Link 4</p>
              <p className="p-2 font-bold text-leading">Link 5</p>
            </div>
          </section>
          <main className="p-1 w-full">{children}</main>
        </SidebarProvider>
    
  );
}
