import { User } from "@/types/dashboard";
import { atom } from "jotai";

export const user_details = atom<User | null>(null);
