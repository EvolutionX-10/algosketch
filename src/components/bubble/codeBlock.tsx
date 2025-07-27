"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ThemedPrism } from "../themed-prism";

export default function CodeBlock() {
	const code: Record<Language, string> = {
		c: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
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
    
    bubbleSort(arr, n);
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    
    return 0;
}`,
		cpp: `#include <iostream>
using namespace std;

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
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
    
    bubbleSort(arr, n);
    
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    
    return 0;
}`,
		python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
if __name__ == "__main__":
    arr = [64, 34, 25, 12, 22, 11, 90]
    print("Original array:", arr)
    
    sorted_arr = bubble_sort(arr.copy())
    print("Sorted array:", sorted_arr)`,
		java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void printArray(int[] arr) {
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        
        System.out.print("Original array: ");
        printArray(arr);
        
        bubbleSort(arr);
        
        System.out.print("Sorted array: ");
        printArray(arr);
    }
}`,
		javascript: `function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array:", arr);

const sortedArr = bubbleSort([...arr]); // Create a copy to preserve original
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
