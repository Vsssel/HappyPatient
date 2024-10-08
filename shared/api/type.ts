export type ApiOption = {
    methos?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, any>;
    auth?: boolean
}

export type ApiResponse<T> = {
    status: number;
    message: string;
    data: T | undefined;
}