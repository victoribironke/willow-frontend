import { User } from "@/interfaces/general";
import { atom } from "jotai";

export const user_details = atom<User | null>(null);
