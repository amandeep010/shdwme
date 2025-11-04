import { saveDataToLocalStorage } from "@/helper/helper";

// lib/api/auth.ts
export async function loginUser(data: { email: string; password: string }) {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  const response = await res.json()
  if (!res.ok) throw new Error(response?.error || "");
  saveDataToLocalStorage(response.data.token, JSON.stringify(response.data.user))
  return response;
}

export async function register(data: { email: string; password: string }) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const response = await res.json()
  if (!res.ok) throw new Error(response?.error || "");
  return response;
}

export async function forgotPassword(data: {email: string , oldPassword: string, password: string}){
  const res = await fetch("/api/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const response = await res.json()
  if (!res.ok) throw new Error(response?.error || "");
  return response;
}
