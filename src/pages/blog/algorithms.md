---
layout: "../../layouts/BlogPost.astro"
title: "My Algorithm Reference [WIP]"
description: "I decided it was probably a good idea to note down all the algorithms I knew somewhere. "
date: "November 1, 2025"
---

# Algorithms

Alright, so. There are a lot of algorithms, some of which are hard to understand and remember. Purely for myself, this is a database of all the ones I've learned and descriptions for myself to remind myself of what they are and how they work.
Code might be included where relevant.

## Table of Contents

- [Resources](#resources)
- [Section 1: The Basics](#section-1-basics)
- [Section 2: Graphs](#section-2-graphs)
- [Section 3: Special Techniques]
  - [3a: Greedy]
  - [3b: Divide-and-Conquer]
  - [3c: Dynamic Programming]

## Resources

Here are some resources I've found (also for my own purposes):

- [USACO Guide](https://usaco.guide)
- [Algorithms for Competitive Programming](https://cp-algorithms.com/index.html)
- [Google TechDev Guide](https://techdevguide.withgoogle.com/paths/data-structures-and-algorithms/)
- [Algorithms by Jeff Erickson (my beloathed textbook)](https://jeffe.cs.illinois.edu/teaching/algorithms/book/Algorithms-JeffE.pdf)

## Section 1: The Basics

These are the fundamental algorithms that are useful all the time, often used to give people ideas of what an algorithm is.
I've omitted the algorithms that are so elementary no one should need to recall them.

### Sorting

Lots of sorting algorithms exist. Here are the important ones:

#### Bad Sorting Algorithms

**Bubble Sort**: Do passes over the array, swapping each pair of elements if they are out of order. This will "bubble" the
largest element to the end of the list with every pass. If no swaps are made during a pass, the array is now sorted.

Time complexity: $O(n^2)$

**Insertion Sort**: Maintain a list of sorted elements. Start with an empty list, and take every element and insert it
where it belongs into that empty list (this can be done in-place by using swapping).

Time complexity: $O(n^2)$

**Selection Sort**: Select the minimum (or maximum, your choice) element in the unsorted list, and repeatedly remove it
and add it to a new list (which will naturally be in-order). This can also be done in-place by using swapping.

Time complexity: $O(n^2)$

#### Good Sorting Algorithms

**Merge Sort**: My old friend.

Divide the list into two lists, and keep dividing it (divide and conquer anyone?) until there are a bunch of 1-element
lists left to join, which are trivially sorted.

Then, you have many sorted lists. Recursively join each sorted list in linear time, by removing the smaller item
out of each list's first item repeatedly until both lists are gone, to merge into one larger sorted array.

Do this approximately $\log n$ times, and you will end up with a sorted array.

Time complexity: $O(n \log n)$

## Section 2: Graphs

Perhaps the most fundamental of concepts.
