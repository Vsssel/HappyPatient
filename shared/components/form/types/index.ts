export type FormFields = {
    name: string;
    type: string;
    class?: string;
    text: string;
    value: string | number | null;
    placeholder?: string;
    options?: any;
    suggestions?: any;
    icon?: string;
    placeIcon?: string;
    placeField?: string;
    size?: string;
    search?: any;
    required: boolean;
}[]