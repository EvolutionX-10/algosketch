import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { navData } from "./constants";

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
