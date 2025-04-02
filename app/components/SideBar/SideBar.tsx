import { useState } from "react";
import Button from "../Button/Button";
import iconSideBar from "../../../public/icons/toggle_sidebar.png";
import IconDashboard from "../../../public/icons/dashboard.png";
import IconGastos from "../../../public/icons/gastos.png";
import IconReceitas from "../../../public/icons/receitas.png";
import Icon from "../Icon/Icon";

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`relative top-0 left-0 max-w-[120px] h-screen bg-[#ff9800] ${isOpen ? "w-full" : "w-[80px] max-w-[80px]"} transition-all duration-500`}>
            <Button onClick={toggleSidebar} className="w-full flex justify-center items-center p-4 cursor-pointer">
                <Icon src={iconSideBar} w={25} h={25} className="" alt="toggle sidebar" />
            </Button>
            <nav className="flex flex-col gap-2">
                <a href="/dashboard" className={`w-full h-auto flex py-2 px-4 ${isOpen ? "hover:bg-gray-700 justify-items-start"  : "justify-center"} duration-500`}>{isOpen ? "Dashboard" : <Icon src={IconDashboard} alt="dashboard" className="" w={40} />}</a>
                <a href="/gastos" className={`w-full h-auto flex py-2 px-4 ${isOpen ? "hover:bg-gray-700 justify-items-start"  : "justify-center"} duration-500`}>{isOpen ? "Gastos" : <Icon src={IconGastos} alt="gastos" className="" w={40} />}</a>
                <a href="/receitas" className={`w-full h-auto flex py-2 px-4 ${isOpen ? "hover:bg-gray-700 justify-items-start"  : "justify-center"} duration-500`}>{isOpen ? "Receitas" : <Icon src={IconReceitas} alt="receitas" className="" w={40} />}</a>
            </nav>
        </div>
    );
}