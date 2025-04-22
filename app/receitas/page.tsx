"use client";
import { useEffect, useState } from "react";
import { sendReceitas } from "../service/send_receitas";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";
import Modal from "../components/Modal/Modal";
import Form from "../components/Form/Form";
import Field from "../interfaces/interfaceForm";

export default function Receitas() {

    const [data, setData] = useState({
        receitas: [],
        labels: [],
        categorias: [],
    });

    const [dataIsValid, setDataIsValid] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const categorias = [
        { label: "Salário", value: "salario" },
        { label: "Investimentos", value: "investimentos" },
        { label: "Outros", value: "outros" },
    ]

    useEffect(()=> {
        if (data && data.receitas && data.labels && data.categorias) {
            setDataIsValid(true);
        } else {
            setDataIsValid(false);
        }
    }, [data])

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/users/receitas", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                });
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    },[])

    const somenteNumeros = (valor: string) => {
        return valor.replace(/\D/g, "");
    }

    const formatValor = (valor: string) => {
        const numero = somenteNumeros(valor);
        const floatNumber = parseFloat(numero) / 100;
        return floatNumber.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    const handleSubmit = async (data: Record<string, string | number | boolean>) => {
        console.log(data.valor);
        const fetchReceitas = await sendReceitas(data);
        if (fetchReceitas) {
            console.log(data);
            console.log("Receita cadastrada com sucesso!");
            setIsModalOpen(false);
            alert("Receita cadastrada com sucesso!");
        } else {
            console.log("Erro ao cadastrar receita!");
            alert("Erro ao cadastrar receita! Verifique os dados.");
        }
    }

    const fields: Field[] = [
        {
            name: "name_banco",
            label: "Nome do Banco",
            type: "text",
            required: true,
            className: "flex flex-col",
            classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]",
            classNameLabel: "ml-2 text-[#795300] font-[400]",
        },
        {
            name: "valor",
            label: "Valor",
            type: "text",
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
                return formatValor(e.target.value);
            },
            required: true,
            className: "flex flex-col",
            classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]",
            classNameLabel: "ml-2 text-[#795300] font-[400]",
        },
        {
            name: "categoria",
            label: "Categoria",
            type: "select",
            options: categorias.map((categoria) => ({ label: categoria.label, value: categoria.value, className: "bg-[#c39200] mb-4 rounded-lg text-blue pl-2 h-[30px] placeholder-white font-[300]"})),
            required: true,
            className: "flex flex-col",
            classNameSelect: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]",
            classNameInput: "bg-[#c39200] mb-4 rounded-lg text-white pl-2 h-[30px] placeholder-white font-[300]",
            classNameLabel: "ml-2 text-[#795300] font-[400]",
        },
        {
            name: "descricao",
            label: "Descrição",
            type: "text",
            required: true,
            className: "flex flex-col",
            classNameInput: "bg-[#c39200] mt-2 rounded-lg text-white pl-2 h-[50px] placeholder-white font-[300]",
            classNameLabel: "ml-2 text-[#795300] font-[400]",
        }
    ]

    return (
        <div className="flex flex-row w-full h-screen bg-white">
            <SideBar />
            <section className="flex flex-col w-full">
                <Header className="relative top-0 left-0 w-full h-16 flex items-center justify-between px-4">
                    <h1 className="text-2xl font-bold text-[#ff9800]">Receitas</h1>
                    <Button onClick={()=> setIsModalOpen(true)} label="Nova Receita" className="bg-[#ff9800] w-[150px] h-10 rounded-lg cursor-pointer"/>
                </Header>
                <main>
                    {dataIsValid ? (
                        <div>
                            <h1>Dados validados</h1>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center w-full text-black">
                            <h1>Dados inválidos</h1>
                            <p>Verifique se os dados estão corretos.</p>
                        </div>
                    )}
                    <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
                        <Form
                            fields={fields}
                            onSubmit={(data) => {
                                handleSubmit(data);
                            }}
                            buttonText="Registrar Receita"
                            styleFormContainer="p-4 w-full h-full"
                            styleButtonSubmit="bg-[#ff9800] w-full min-w-[150px] max-w-[400px] h-12 absolute bottom-8 left-1/2 -translate-x-1/2 h-10 rounded-lg cursor-pointer text-white font-bold text-[20px]"
                        />
                    </Modal>
                </main>
            </section>
        </div>
    )
}