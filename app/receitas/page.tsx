"use client";
import { useEffect, useState } from "react";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import SideBar from "../components/SideBar/SideBar";

interface ReceitasProps {
    data: {
        receitas: number[];
        labels: string[];
        categorias: string[];
    }
}

export default function Receitas({ data } : ReceitasProps) {

    const [dataIsValid, setDataIsValid] = useState(false);

    useEffect(()=> {
        if (data && data.receitas && data.labels && data.categorias) {
            setDataIsValid(true);
        } else {
            setDataIsValid(false);
        }
    })

    return (
        <div className="flex flex-row w-full h-screen bg-white">
            <SideBar />
            <section className="flex flex-col w-full">
                <Header className="relative top-0 left-0 w-full h-16 flex items-center justify-between px-4">
                    <h1 className="text-2xl font-bold text-[#ff9800]">Receitas</h1>
                    <Button label="Nova Receita" className="bg-[#ff9800] w-[150px] h-10 rounded-lg cursor-pointer"/>
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
                </main>
            </section>
        </div>
    )
}