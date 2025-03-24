"use client";
import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { ChartData, ChartOptions } from "chart.js";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
    const [data, setData] = useState<ChartData<'bar'>>({
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
        const fetchData = () => {
            const chartData: ChartData<'bar'> = {
                labels: ['January', 'February', 'March', 'April', 'May'], // Labels para os eixos X
                datasets: [
                    {
                        label: 'Vendas Mensais',
                        data: [65, 59, 80, 81, 56], // Dados para as barras
                        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor de fundo das barras
                        borderColor: 'rgba(75, 192, 192, 1)', // Cor da borda das barras
                        borderWidth: 1,
                    },
                ],
            };

            setData(chartData);
        };

        fetchData();
    }, []);

    return (
        <div className="w-full h-[400px] flex justify-center">
            <Bar data={data} options={config_grafic}></Bar>
        </div>
    )
}