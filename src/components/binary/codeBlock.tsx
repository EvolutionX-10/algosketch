"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ThemedPrism } from "../themed-prism";

export default function CodeBlock() {
	const code: Record<Language, string> = {
		c: `#include <stdio.h>

int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found! Return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    
    printf("Sorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    printf("Searching for: %d\\n", target);
    
    int result = binarySearch(arr, n, target);
    
    if (result != -1) {
        printf("Element found at index: %d\\n", result);
    } else {
        printf("Element not found\\n");
    }
    
    return 0;
}`,
		cpp: `#include <iostream>
using namespace std;

int binarySearch(int arr[], int n, int target) {
    int left = 0;
    int right = n - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid; // Found! Return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 23;
    
    cout << "Sorted array: ";
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    cout << "Searching for: " << target << endl;
    
    int result = binarySearch(arr, n, target);
    
    if (result != -1) {
        cout << "Element found at index: " << result << endl;
    } else {
        cout << "Element not found" << endl;
    }
    
    return 0;
}`,
		python: `def binary_search(arr, target):
    left = 0
    right = len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid  # Found! Return the index
        elif arr[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found

# Example usage
if __name__ == "__main__":
    arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78]
    target = 23
    
    print("Sorted array:", arr)
    print(f"Searching for: {target}")
    
    result = binary_search(arr, target)
    
    if result != -1:
        print(f"Element found at index: {result}")
    else:
        print("Element not found")`,
		java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid; // Found! Return the index
            } else if (arr[mid] < target) {
                left = mid + 1; // Search right half
            } else {
                right = mid - 1; // Search left half
            }
        }
        return -1; // Not found
    }
    
    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78};
        int target = 23;
        
        System.out.print("Sorted array: ");
        for (int value : arr) {
            System.out.print(value + " ");
        }
        System.out.println();
        System.out.println("Searching for: " + target);
        
        int result = binarySearch(arr, target);
        
        if (result != -1) {
            System.out.println("Element found at index: " + result);
        } else {
            System.out.println("Element not found");
        }
    }
}`,
		javascript: `function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found! Return the index
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return -1; // Not found
}

// Example usage
const arr = [2, 5, 8, 12, 16, 23, 38, 45, 56, 67, 78];
const target = 23;

console.log("Sorted array:", arr);
console.log("Searching for:", target);

const result = binarySearch(arr, target);

if (result !== -1) {
    console.log("Element found at index:", result);
} else {
    console.log("Element not found");
}`,
	};

	const [language, setLanguage] = useState<Language>("c");

	return (
		<div className="bg-accent rounded border-2 border-cyan-400 p-4">
			<div className="relative flex gap-2 flex-wrap">
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
