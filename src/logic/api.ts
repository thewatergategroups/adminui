import axios from "axios";
import Cookies from "js-cookie";
import { User } from "./types";

const IDENTITY_URL = `https://auth.thewatergategroups.com`

axios.defaults.withCredentials = true;

export async function logout(): Promise<void | null> {
    try {
        await axios.post(`${IDENTITY_URL}/logout`,{withCredentials: true});
        Cookies.remove("session_id");
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}

export async function checkLoggedIn(): Promise<void | boolean> {
    try {
        const resp = await axios.get(`${IDENTITY_URL}/session/status`);
        if (resp.status !== 200){
            return false
        }
        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
}

export async function getUsers(): Promise<User[] | null> {
    try {
        console.log(Cookies.get())
        const res = await axios.get(`${IDENTITY_URL}/users`,{withCredentials: true});
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}
