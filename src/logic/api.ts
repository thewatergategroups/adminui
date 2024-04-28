import axios from "axios";
import Cookies from "js-cookie";
import { User } from "./types";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function logout(): Promise<void | null> {
    try {
        await axios.post(`${VITE_API_URL}/logout`);
        Cookies.remove("Authorization");
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}

export async function getUsers(): Promise<User[] | null> {
    try {
        const res = await axios.get(`${VITE_API_URL}/users`);
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}
