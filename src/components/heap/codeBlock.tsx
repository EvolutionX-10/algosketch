"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ThemedPrism } from "../themed-prism";

export default function CodeBlock() {
	const code: Record<Language, string> = {
		c: `#include <stdio.h>

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(&arr[i], &arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        swap(&arr[0], &arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    heapSort(arr, n);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,
		cpp: `#include <iostream>
using namespace std;

void heapify(int arr[], int n, int i) {
    int largest = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(int arr[], int n) {
    // Build max heap
    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i);
    
    // Extract elements from heap
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    cout << "Original array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    heapSort(arr, n);
    
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
		python: `def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

def heap_sort(arr):
    n = len(arr)
    
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    
    return arr

# Example usage
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", arr)
    
    sorted_arr = heap_sort(arr.copy())
    print("Sorted array:", sorted_arr)`,
		java: `import java.util.Arrays;

public class HeapSort {
    public static void heapSort(int[] arr) {
        int n = arr.length;
        
        // Build max heap
        for (int i = n / 2 - 1; i >= 0; i--)
            heapify(arr, n, i);
        
        // Extract elements from heap
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            
            heapify(arr, i, 0);
        }
    }
    
    public static void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        if (left < n && arr[left] > arr[largest])
            largest = left;
        
        if (right < n && arr[right] > arr[largest])
            largest = right;
        
        if (largest != i) {
            int temp = arr[i];
            arr[i] = arr[largest];
            arr[largest] = temp;
            
            heapify(arr, n, largest);
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array: " + Arrays.toString(arr));
        
        heapSort(arr);
        
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
		javascript: `function heapSort(arr) {
    const n = arr.length;
    
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }
    
    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    
    return arr;
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);

const sortedArr = heapSort([...arr]); // Create a copy to preserve original
console.log("Sorted array:", sortedArr);`,
	};

	const [language, setLanguage] = useState<Language>("c");

	return (
		<div className="bg-accent rounded border-2 border-cyan-400 p-4">
			<div className="relative flex flex-wrap gap-2">
				{(Object.keys(code) as Array<Language>).map((lang) => (
					<button
						key={lang}
						className={`relative z-10 cursor-pointer rounded-t px-3 py-1 transition-colors duration-200 hover:bg-cyan-100/50 dark:hover:bg-cyan-100/5 ${
							language === lang ? "text-cyan-600 dark:text-cyan-300" : "text-gray-600 dark:text-gray-400"
						}`}
						onClick={() => setLanguage(lang)}
						type="button"
					>
						{language === lang && (
							<motion.div
								layoutId="activeTab"
								className="absolute inset-0 rounded-t rounded-b-xs border-b-2 border-b-cyan-400 bg-cyan-50/30 dark:border-b-cyan-200 dark:bg-cyan-950/30"
								transition={{
									type: "spring",
									stiffness: 500,
									damping: 30,
								}}
							/>
						)}
						<motion.span
							className="relative z-20"
							animate={{
								scale: language === lang ? 1.05 : 1,
							}}
							transition={{
								type: "spring",
								stiffness: 400,
								damping: 25,
							}}
						>
							{lang === "cpp" ? "C++" : lang.toUpperCase()}
						</motion.span>
					</button>
				))}
			</div>
			<div className="bg-accent p-1">
				<ThemedPrism
					language={language}
					customStyle={{ fontFamily: "var(--font-mono)" }}
					showLineNumbers={true}
					wrapLines={true}
				>
					{code[language]}
				</ThemedPrism>
			</div>
		</div>
	);
}

type Language = "javascript" | "python" | "c" | "cpp" | "java";
