import { Client, Trainer, Nutritionist, PendingUser } from "@/app/users/userTypes";
const apiBase = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = `${apiBase}/users`;

export const fetchClients = async (): Promise<Client[]> => {
  const res = await fetch(`${BASE_URL}/clients`);
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
};

export const fetchTrainers = async (): Promise<Trainer[]> => {
  const res = await fetch(`${BASE_URL}/trainers`);
  if (!res.ok) throw new Error("Failed to fetch trainers");
  return res.json();
};

export const fetchNutritionists = async (): Promise<Nutritionist[]> => {
  const res = await fetch(`${BASE_URL}/nutritionists`);
  if (!res.ok) throw new Error("Failed to fetch nutritionists");
  return res.json();
};

export const fetchPendingUsers = async (): Promise<PendingUser[]> => {
  const res = await fetch(`${BASE_URL}/pending`);
  if (!res.ok) throw new Error("Failed to fetch pending users");
  return res.json();
};
