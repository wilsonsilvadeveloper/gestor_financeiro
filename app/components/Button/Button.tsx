    import ButtonProps from "@/app/interface/button";

    export default function Button({ label, onClick, disabled, className, type, children }: ButtonProps) {
        return (
            <button type={type} disabled={disabled} className={className} onClick={onClick}>
                {children ? children : label}
            </button>
        );
    }