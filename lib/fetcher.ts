"use client"
// lib/fetcher.ts
export const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error fetching data");
    return res.json();
  });
