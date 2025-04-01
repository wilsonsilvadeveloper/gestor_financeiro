import { ReactNode } from "react";

interface ButtonProps {
    label?: string;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
    children?: ReactNode
}

export default ButtonProps;