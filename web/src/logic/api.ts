import axios from "axios";
import Cookies from "js-cookie";
import { Client, Role, User, UserRequest } from "./types";

export const IDENTITY_URL = "https://auth.thewatergategroups.com";

axios.defaults.withCredentials = true;

export async function logout(): Promise<void | null> {
    try {
        await axios.post(`${IDENTITY_URL}/logout`, { withCredentials: true });
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
        if (resp.status !== 200) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
}

export async function getUsers(): Promise<User[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/users`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function patchUser(user: User): Promise<null> {
    try {
        const res = await axios.patch(`${IDENTITY_URL}/users/user`,user, {
             withCredentials: true,      
             headers: {
                'Content-Type': 'application/json',
          }, 
        });
        if (res.status === 200) {
            console.log('User updated successfully');
            return null;
          } else {
            console.error('Failed to update user', res.status);
            throw new Error('Failed to update user');
          }
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
}

export async function patchClient(client: Client): Promise<null> {
    try {
        const res = await axios.patch(`${IDENTITY_URL}/clients/client`,client, {
             withCredentials: true,      
             headers: {
                'Content-Type': 'application/json',
          }, 
        });
        if (res.status === 200) {
            console.log('Client updated successfully');
            return null;
          } else {
            console.error('Failed to update user', res.status);
            throw new Error('Failed to update user');
          }
        } catch (error) {
          console.error('Error:', error);
          throw error;
        }
}

export async function getClients(): Promise<Client[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/clients`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function getRoles(): Promise<Role[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/roles`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function getScopes(): Promise<Role[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/scopes`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function getSelfUser(): Promise<User | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/users/me`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function handleCreateUser(user: UserRequest): Promise<User | null> {
    try {
        const res = await axios.post(`${IDENTITY_URL}/users/user`, user, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}
