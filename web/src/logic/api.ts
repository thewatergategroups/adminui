import axios from "axios";
import Cookies from "js-cookie";
import { Client, ClientCreateResponse, ClientRequest, Role, Scope, User, UserRequest, Parameter, ParameterRequest,Domain,DomainRequest, BacktestResult } from "./types";

export const IDENTITY_URL = "https://auth.thewatergategroups.com";

axios.defaults.withCredentials = true;


export async function handleGetUsers(): Promise<User[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/users`, { withCredentials: true });
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

export async function handleDeleteUser(user: User): Promise<null> {
    try {
        await axios.delete(`${IDENTITY_URL}/users/user`, { withCredentials: true, params: {user_email: user.email} });
        return null;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}


export async function handlePatchUser(user: User): Promise<null> {
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

export async function handleGetClients(): Promise<Client[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/clients`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function handleCreateClient(client: ClientRequest): Promise<ClientCreateResponse | null> {
    try {
        const res = await axios.post(`${IDENTITY_URL}/clients/client`, client, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

export async function handleDeleteClient(client: Client): Promise<null> {
    try {
        await axios.delete(`${IDENTITY_URL}/clients/client`, { withCredentials: true, params: {id_: client.id_} });
        return null;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

export async function handlePatchClient(client: Client): Promise<null> {
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

export async function handleGetScopes(): Promise<Role[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/scopes`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}
export async function handleCreateScopes(scope:Scope): Promise<null> {
    try {
        const res = await axios.post(`${IDENTITY_URL}/scopes/scope`,scope, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}
export async function handleDeleteScope(scope: Scope): Promise<null> {
    try {
        await axios.delete(`${IDENTITY_URL}/scopes/scope`, { withCredentials: true, params: {id_: scope.id_} });
        return null;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}


export async function handleGetRoles(): Promise<Role[] | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/roles`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function handleCreateRole(role: Role): Promise<null> {
    try {
        const res = await axios.post(`${IDENTITY_URL}/roles/role`, role, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

export async function handleDeleteRole(role: Role): Promise<null> {
    try {
        await axios.delete(`${IDENTITY_URL}/roles/role`, { withCredentials: true, params: {id_: role.id_} });
        return null;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

export async function handlePatchRole(role: Role): Promise<null> {
    try {
        const res = await axios.patch(`${IDENTITY_URL}/roles/role`,role, {
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

export async function handleGetSelfUser(): Promise<User | null> {
    try {
        const res = await axios.get(`${IDENTITY_URL}/users/me`, { withCredentials: true });
        return res.data;
    } catch (error) {
        console.error("Error getting users:", error);
        return null;
    }
}

export async function handleLogout(): Promise<void | null> {
    try {
        await axios.post(`${IDENTITY_URL}/logout`, { withCredentials: true });
        Cookies.remove("oauth2-session");
        console.log("Logout successful");
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}

export async function handleCheckLoggedIn(): Promise<void | boolean> {
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

export const AWS_RESOURCE_MANAGER_URL = "https://resource.thewatergategroups.com"

export async function handleGetParameters(): Promise<Parameter[] | null> {
    try {
        const resp = await axios.get(`${AWS_RESOURCE_MANAGER_URL}/parameters`);
        if (resp.status !== 200) {
            return null;
        }
        return resp.data;
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}

export async function handleDeleteParameter(param: Parameter): Promise<null> {
    try {
        await axios.delete(`${AWS_RESOURCE_MANAGER_URL}/parameters/parameter`, { withCredentials: true, params: {name: param.Name} });
        return null;
    } catch (error) {
        console.error("Error deleting parameter:", error);
        return null;
    }
}

export async function handleCreateUpdateParameter(parameter: ParameterRequest): Promise<null> {
    try {
        const res = await axios.post(`${AWS_RESOURCE_MANAGER_URL}/parameters/parameter`,  {
            name: parameter.name,
            description: parameter.description,
            type_: parameter.type_,
            value: JSON.parse(parameter.value)  
        }, { withCredentials: true});
        return res.data;
    } catch (error) {
        console.error("Error creating parameter:", error);
        return null;
    }
}



export async function handleGetDomains(): Promise<Domain[] | null> {
    try {
        const resp = await axios.get(`${AWS_RESOURCE_MANAGER_URL}/domains/record-sets`);
        if (resp.status !== 200) {
            return null;
        }
        return resp.data;
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}

export async function handleDeleteDomain(domain: Domain): Promise<null> {
    try {
        await axios.delete(`${AWS_RESOURCE_MANAGER_URL}/domains/record-set`, { withCredentials: true, params: {name: domain.Name, type_: domain.Type, ttl:domain.TTL} });
        return null;
    } catch (error) {
        console.error("Error deleting record set:", error);
        return null;
    }
}

export async function handleCreateUpdateDomain(domain: DomainRequest): Promise<null> {
    try {
        const res = await axios.post(`${AWS_RESOURCE_MANAGER_URL}/domains/record-set`,  domain, { withCredentials: true});
        return res.data;
    } catch (error) {
        console.error("Error creating record set:", error);
        return null;
    }
}

export const LLAMA_TRADING_URL = "https://trading.thewatergategroups.com"


export async function handleGetBacktestResults(): Promise<BacktestResult[] | null> {
    try {
        const resp = await axios.get(`${LLAMA_TRADING_URL}/backtest/results`);
        if (resp.status !== 200) {
            return null;
        }
        return resp.data;
    } catch (error) {
        console.error("Logout failed:", error);
        return null;
    }
}