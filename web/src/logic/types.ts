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


// trading 

// types.ts

export interface Position {
    qty: string;
    usd: number | null;
    side: string;
    symbol: string;
    asset_id: string;
    exchange: string;
    swap_rate: number | null;
    cost_basis: string;
    asset_class: string;
    change_today: string;
    market_value: string;
    current_price: string;
    lastday_price: string;
    qty_available: string;
    unrealized_pl: string;
    avg_entry_price: string;
    unrealized_plpc: string;
    asset_marginable: boolean;
    avg_entry_swap_rate: number | null;
    unrealized_intraday_pl: string;
    unrealized_intraday_plpc: string;
  }
  
  export interface VWAPResult {
    buys: number;
    sells: number;
    equity: number;
    positions: {
      positions_held: {
        [key: string]: Position;
      };
    };
    buying_power: number;
    total_positions_held: number;
    starting_buying_power: number;
  }
  
  export interface StrategyCondition {
    name: string;
    type: string;
    active: boolean;
    variables: {
      [key: string]: number;
    };
  }
  
  export interface Strategy {
    name: string;
    alias: string;
    active: boolean;
    conditions: StrategyCondition[];
  }
  
  export interface BacktestResult {
    id: number;
    symbols: string[];
    result: {
      vwap?: VWAPResult;
    };
    status: string;
    timestamp: string;
    strategies: Strategy[] | null;
  }
  