"use client";
import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { DashboardData } from "@/app/interface/dashboard";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DashboardProps {
    data: DashboardData;
}

export default function Dashboard({data} : DashboardProps) {
    const [isEmpty, setIsEmpty] = useState<boolean>(false);
    const [chartData, setChartData] = useState<ChartData<'bar'>>({
        labels: [],
        datasets: []
    });

    const config_grafic : ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: "Grafico Financeiro",
            },
            tooltip: {
                enabled: true,
            }
        }
    }

    useEffect(() => {
        if(data && data.receitas && data.gastos && data.labels) {
            const chartData: ChartData<'bar'> = {
                labels: data.labels,
                datasets: [{
                    label: "Receitas",
                    data: data.receitas,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
                    borderColor: 'rgba(75, 192, 192, 1)',
                },
                {
                    label: "Despesas",
                    data: data.gastos,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Cor de fundo das barras
                    borderColor: 'rgba(255, 99, 132, 1)',
                }],
            }
            setChartData(chartData);
        } else {
            setIsEmpty(true);
        }
    }, [data])

    return (
        <div className="w-full h-[400px] flex justify-center">
            {isEmpty ? (
                <div className="flex items-center justify-center w-full h-full">
                    <p className="text-gray-500">Não há dados disponíveis para exibir.</p>
                </div>
            ) : (
                <Bar data={chartData} options={config_grafic}></Bar>
            )}
        </div>
    )
}