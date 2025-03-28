interface ButtonProps {
    label: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button(ButtonProps: ButtonProps){
    return (
        <button type={ButtonProps.type} disabled={ButtonProps.disabled} className={ButtonProps.className} onClick={ButtonProps.onClick}>{ButtonProps.label}</button>
    )
}