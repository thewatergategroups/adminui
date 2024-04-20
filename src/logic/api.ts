import axios from "axios";
import Cookies from "js-cookie";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function logout(): Promise<void> {
  try {
    await axios.post(`${VITE_API_URL}/public/logout`);
    Cookies.remove("Authorization");
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
