import axios from "axios";
import Cookies from "js-cookie";
import { User } from "./types";

const IDENTITY_URL = `https://auth.thewatergategroups.com`

axios.defaults.withCredentials = true;

export async function logout(): Promise<void | null> {
    try {
        await axios.post(`${IDENTITY_URL}/logout`);
        Cookies.remove("session_id");
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}

export async function checkLoggedIn(): Promise<void | boolean> {
    try {
        await axios.get(`${IDENTITY_URL}/session/status`);
        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
}

export async function getUsers(): Promise<User[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/users`);
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}
