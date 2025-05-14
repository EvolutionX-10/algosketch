import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const adminPasswordPath = "/password";
	const clearAdminPath = "/clear";

	if (request.nextUrl.pathname === adminPasswordPath) {
		const response = NextResponse.redirect(new URL("/dashboard", request.url));

		response.cookies.set("admin", "true", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "strict",
			maxAge: 60 * 60,
			path: "/",
		});

		return response;
	}

	if (request.nextUrl.pathname === clearAdminPath) {
		const response = NextResponse.redirect(new URL("/", request.url));
		response.cookies.delete("admin");
		return response;
	}

	const isAdmin = request.cookies.get("admin")?.value === "true";

	if (request.nextUrl.pathname === "/soon") {
		return NextResponse.next();
	}

	if (!isAdmin) {
		return NextResponse.redirect(new URL("/soon", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};
