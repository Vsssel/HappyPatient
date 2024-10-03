export type PostPatientAuthSignUpRequest = {
    name: string;
    surname: string;
    email: string;
    gender: string;
    birthDate: string;
    emailVerificationCode: number;
    password: string;
  
}

export type PostPatientAuthSignUpResponse = {
    id: number
}

export type PostPatientAuthRequest = {
    email: string
}

export type PostPatientAuthResponse = {
    detail: string
}