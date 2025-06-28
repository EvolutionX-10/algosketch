import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider className="flex h-screen w-screen">
			<AppSidebar />
			<SidebarInset className="flex min-h-0 flex-col">
				<Header />
				<main className="flex-1 overflow-auto">
					<section className="relative flex min-h-full flex-col gap-4 p-4 pt-8 md:items-center-safe">
						{children}
					</section>
				<Footer className="mt-auto" />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
