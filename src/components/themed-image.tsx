"use client";

import Image, { ImageProps } from "next/image";

import { useTheme } from "next-themes";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
	srcLight: string;
	srcDark: string;
};

export default function ThemedImage(props: Props) {
	const { resolvedTheme: theme } = useTheme();
	const { srcLight, srcDark, ...rest } = props;
	const src = theme === "dark" ? srcDark : srcLight;

	return <Image {...rest} src={src} />;
}
