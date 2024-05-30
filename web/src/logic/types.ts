export interface User {
    id_: string;
    email: string;
    first_name: string;
    surname: string;
    dob: string;
    postcode: string;
    created_at:string;
    roles: Array<string>
}
