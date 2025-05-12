import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="flex h-screen w-screen">
			<AppSidebar />
			<SidebarInset>
				<Header />
				<section className="flex flex-1 flex-col gap-4 p-4">{children}</section>
			</SidebarInset>
		</SidebarProvider>
	);
}
