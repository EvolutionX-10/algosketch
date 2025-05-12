export default function SortingPage() {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<h1 className="text-4xl font-bold">Sorting Algorithms</h1>
			<p className="mt-4 text-lg">Sorting algorithms are algorithms that put elements of a list in a certain order.</p>
			<p className="mt-2 text-lg">The most common orders are numerical order and lexicographical order.</p>
			<p className="mt-2 text-lg">
				Sorting algorithms are a core part of computer science and are used in many applications.
			</p>
			<p className="mt-2 text-lg">Some common sorting algorithms include:</p>
			<ul className="mt-4 list-disc pl-6">
				<li className="mt-2">Bubble Sort</li>
				<li className="mt-2">Insertion Sort</li>
				<li className="mt-2">Selection Sort</li>
				<li className="mt-2">Merge Sort</li>
				<li className="mt-2">Quick Sort</li>
				<li className="mt-2">Heap Sort</li>
				<li className="mt-2">Radix Sort</li>
				<li className="mt-2">Counting Sort</li>
			</ul>
		</div>
	);
}
