import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { navData } from "./constants";
import { type NextRequest, NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getLink(crumb: string) {
	const root = "/dashboard";
	const findPath = (data: typeof navData, target: string, path: string[] = []): string[] | null => {
		for (const item of data) {
			const currentPath = [...path, item.url];
			if (item.url === target) {
				return currentPath;
			}
			if (item.items) {
				const result = findPath(item.items, target, currentPath);
				if (result) {
					return result;
				}
			}
		}
		return null;
	};

	const path = findPath(navData, crumb);
	return path ? `${root}/${path.join("/")}` : root;
}

export function getName(crumb: string) {
	const findName = (data: typeof navData, target: string): string | null => {
		for (const item of data) {
			if (item.url === target) {
				return item.title;
			}
			if (item.items) {
				const result = findName(item.items, target);
				if (result) {
					return result;
				}
			}
		}
		return null;
	};

	const name = findName(navData, crumb);
	return name ? name : "Dashboard";
}

export function generateDailyPassword(): string {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const day = now.getDate();

	const adjectives = ["swift", "clever", "bright", "quick", "smart", "fast", "wise", "sharp"];
	const nouns = ["algo", "code", "data", "tree", "graph", "sort", "search", "hash"];

	const adjIndex = (day + month) % adjectives.length;
	const nounIndex = (day * month) % nouns.length;

	const adjective = adjectives[adjIndex];
	const noun = nouns[nounIndex];
	const yearSuffix = (year % 100).toString().padStart(2, "0");

	return `${adjective}${noun}${yearSuffix}`;
}
