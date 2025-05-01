"use client";
import { useEffect, useState } from "react";

const Hydrate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isHydrated, setIsHydrated] = useState(false);

	useEffect(() => {
		setIsHydrated(true);
	}, []);

	if (!isHydrated) {
		return null;
	}

	return <>{children}</>;
};

export default Hydrate;
