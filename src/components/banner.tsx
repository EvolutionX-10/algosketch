"use client";

export default function Banner({ onClickAction }: BannerProps) {
	return (
		<div className="absolute top-4 left-0 flex w-full items-center justify-center">
			<button
				className="font-fancy mx-2 w-full max-w-[75ch] cursor-pointer rounded-md border-2 bg-blue-50/50 px-4 py-1 text-lg font-bold uppercase shadow-md transition duration-200 ease-in-out hover:shadow-lg focus:outline-none active:scale-95"
				onClick={onClickAction}
			>
				Go to Visualizer!
			</button>
		</div>
	);
}

interface BannerProps {
	onClickAction: () => void;
}
