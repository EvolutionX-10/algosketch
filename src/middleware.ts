import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.nextUrl.origin === "http://localhost:3000") {
		const response = NextResponse.next();

		response.cookies.set("dev", "true", {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60,
			path: "/",
		});
		return response;
	}

	const clearAdminPath = "/clear";
	const password = "/password";

	if (request.nextUrl.pathname === password) {
		const response = NextResponse.redirect(new URL("/", request.url));

		response.cookies.set("dev", "true", {
			httpOnly: true,
			sameSite: "strict",
			maxAge: 60 * 60,
			path: "/",
		});

		return response;
	}

	if (request.nextUrl.pathname === clearAdminPath) {
		const response = NextResponse.redirect(new URL("/", request.url));
		response.cookies.delete("dev");
		return response;
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
