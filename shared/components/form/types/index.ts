export type FormFieldProps = {
    name: string;
    type: string;
    required: boolean;
    value?: unknown;
    class?: string;
    style?: string | Record<string, string>;
    label?: Partial<{
        text: string;
        class?: string;
        style?: string | Record<string, string>;
    }>;
    icon?: string;
    placeholder?: string;
    disabled?: boolean;
}

export type InputField = {
    type: 'text' | 'number';
}

export type SelecField = {
    type: 'select',
    options: Array<{
        label: string;
        value: unknown;
    }>
}

export type PasswordField = {
    type: 'password',
    feedback?: boolean,
    value: string | null;
}

export type SlotField = {
    type: 'slot',
    name: string
}

export type TextArea = {
    type: 'textarea'
}

export type AutocompleteField = {
    type: 'autocomplete';
    suggestions: string[] | number[];
}

export type DatePickerField = {
    type: 'date',
    value: Date | null | undefined | Date[]
    name: string,
    showIcon?: boolean,
    iconDisplay?: 'input',
    timeOnly?: boolean,
    minDate?: Date,
    maxDate?: Date,
    showButtonBar?: boolean,
    dateFormat?: 'dd/mm/yy' | 'mm/dd/yy' | 'yy/mm/dd'
}

export type FormFields = FormFieldProps & (InputField | SelecField | SlotField | TextArea | AutocompleteField | PasswordField | DatePickerField)