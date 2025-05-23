"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimationData from "../../public/animations/gafrico_linha.json"
import LoadingAnimation from "../../public/animations/loading2.json"
import Form from "../components/Form/Form";
import Field from "../interfaces/interfaceForm";
import Login from "../service/login";

const Animation = dynamic(()=> import("../components/Animation/Animation"), {ssr: false});

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fields: Field[] = [
        {
        name: "email",
        label: "Seu E-mail",
        type: "email",
        required: true,
        className: "flex flex-col",
        classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]",
        classNameLabel: "ml-2 text-[#795300] font-[400]",
        },
        {
        name: "password",
        label: "Senha",
        type: "password",
        required: true,
        className: "flex flex-col",
        classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]",
        classNameLabel: "ml-2 text-[#795300] font-[400]",
        },
    ];

    const handleSubmit = async (data: Record<string, string | number | boolean>) => {
        const fetchLogin = await Login(data.email as string, data.password as string);
        if (fetchLogin.authenticated) {
            console.log(data);
            console.log("Login realizado com sucesso!");
            setIsLoading(true);
            setTimeout(() => {
                router.push("/dashboard");
            }, 3000);
        } else {
            console.log("Erro ao realizar login!");
            console.log(fetchLogin.message);
            setIsLoading(false);
            alert("Erro ao realizar login! Verifique suas credenciais.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafdff] text-[#0a0a0a]">
            <h1 className="text-xl font-bold mb-2 text-[#795300]">Bem vindo(a) de volta ao Sistema de Gestão Financeira Pessoal</h1>
            <p className="text-[#795300] font-[500] mb-2">Acompanhe suas finanças de forma fácil e interativa, entre na sua conta e coloque suas contas em dia!</p>
            <div className="flex flex-row items-center p-8">
                <Animation data={AnimationData} />
                <Form
                    fields={fields}
                    onSubmit={handleSubmit}
                    buttonText="Entrar"
                    styleFormContainer="w-[30%] min-w-[500px] max-w-[50%] h-[280px] relative flex flex-col justify-center text-black bg-[#efb810] p-4 rounded-lg"
                    styleButtonSubmit={`w-[100%] min-w-[200px] max-w-[300px] h-[50px] ${!isLoading ? "hover:bg-[#795300] flex-col" : null} duration-500 flex justify-center aligner-center absolute bottom-4 left-1/2 -translate-x-1/2 mt-4 rounded-lg cursor-pointer text-center bg-[#c39200] text-white text-[18px] font-[400]`}
                    buttonChildren={
                        isLoading ? (
                            <Animation data={LoadingAnimation} className="w-[80px] h-[50px]"/>
                        ) : null
                    }
                />
            </div>
        </div>
    );
}
