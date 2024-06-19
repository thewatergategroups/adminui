type Alg = "ES256" | "RS256";
export type GrantTypes = "authorization_code" | "implicit" | "refresh_token"
export type Roles = "admin" | "standard" | "readonly" // should be dynamic off get roles response
export type ClientType = "confidential"
export type ParameterType = "SecureString" | "String" | "StringList" 
export type DomainType = "CNAME" | "A"
export interface Parameter {
    Name: string;
    Type: ParameterType;
    Value: string;
    Version: number;
    LastModifiedDate: string;
    DataType: string;
    Description: string;
}

export interface ParameterRequest {
    name: string;
    type_: ParameterType;
    description: string;
    value: string;
}

export interface Domain {
    Name: string;
    Type: DomainType;
    TTL: number
}

export interface DomainRequest {
    name: string;
    type_: DomainType;
    ttl: number
}
export interface UserRequest {
    alg: Alg;
    email: string;
    first_name: string;
    surname: string;
    dob: string;
    postcode: string;
    password: string;
    roles: string[] | undefined;
}

export interface ClientRequest {
    name: string;
    description: string;
    type: ClientType;
    grant_types: GrantTypes[];
    redirect_uris: string[];
    roles: Roles[];
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

export interface ClientCreateResponse{
    client_id: string
    client_secret: string
}

export interface Role {
    id_: string;
    scopes: string[];
}

export interface Scope {
    id_: string;
}
