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

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    
    swap(&arr[i + 1], &arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
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
    
    quickSort(arr, 0, n - 1);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,
		cpp: `#include <iostream>
using namespace std;

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
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
    
    quickSort(arr, 0, n - 1);
    
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
		python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[-1]
    smaller = [x for x in arr[:-1] if x < pivot]
    equal = [x for x in arr if x == pivot]
    greater = [x for x in arr[:-1] if x > pivot]
    
    return quick_sort(smaller) + equal + quick_sort(greater)

def quick_sort_inplace(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        pi = partition(arr, low, high)
        quick_sort_inplace(arr, low, pi - 1)
        quick_sort_inplace(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

# Example usage
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", arr)
    
    sorted_arr = quick_sort(arr.copy())
    print("Sorted array:", sorted_arr)`,
		java: `import java.util.Arrays;

public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }
    
    public static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        
        return i + 1;
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.println("Original array: " + Arrays.toString(arr));
        
        quickSort(arr, 0, arr.length - 1);
        
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
		javascript: `function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[arr.length - 1];
    const smaller = arr.slice(0, -1).filter(x => x < pivot);
    const equal = arr.filter(x => x === pivot);
    const greater = arr.slice(0, -1).filter(x => x > pivot);
    
    return [...quickSort(smaller), ...equal, ...quickSort(greater)];
}

function quickSortInPlace(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSortInPlace(arr, low, pi - 1);
        quickSortInPlace(arr, pi + 1, high);
    }
    return arr;
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);

const sortedArr = quickSort([...arr]); // Create a copy to preserve original
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
