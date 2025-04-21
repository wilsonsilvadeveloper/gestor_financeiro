interface Field {
    name: string;
    label?: string;
    className?: string;
    type: "text" | "email" | "password" | "number" | "date" | "select" | "textarea" | "select";
    options?: {value: string, label: string, className?: string}[];
    classNameSelect?: string;
    classNameInput?: string;
    classNameLabel?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

export default Field;