import { saveDataToLocalStorage } from "@/helper/helper";

// lib/api/auth.ts
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  const response = await res.json()
  if (!res.ok) throw new Error(response?.error || "");
  saveDataToLocalStorage(response)
  return response;
}

export async function register(userData: { email: string; password: string }) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const response = await res.json()
  if (!res.ok) throw new Error(response?.error || "");
  return response;
}
