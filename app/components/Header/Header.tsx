interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export default function Header({ children, className }: HeaderProps){
    return (
        <header className={className}>
            {children}
        </header>
    );
};