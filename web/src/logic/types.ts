type Alg = "ES256" | "RS256";

export interface UserRequest {
    alg: Alg;
    email: string;
    first_name: string;
    surname: string;
    dob: string;
    postcode: string;
    password: string;
}

export interface User {
    id_: string;
    email: string;
    first_name: string;
    surname: string;
    dob: string;
    postcode: string;
    created_at: string;
    roles: Array<string>;
}

export interface Client {
    id_: string;
    type: string;
    name: string;
    description: string;
    roles: Array<string>;
    redirect_uris: Array<string>;
    grant_types: Array<string>;
}

export interface Role {
    id_: string;
    scopes: string[];
}

export interface Scope {
    id_: string;
}
