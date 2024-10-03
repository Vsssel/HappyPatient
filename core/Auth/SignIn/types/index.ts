export type PatientAuthSignInRequest = {
    email: string;
    password: string;
}

export type PatientAuthSignInResponse = {
    id: number,
    name: string,
    surname: string,
    gender: string,
    birthDate: number,
    age: number,
    email: string,
    role: string
}