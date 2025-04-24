  "use client";
  import { useEffect, useState } from "react";
  import Dashboard from "../components/Dashboard/Dashboard";
  import Error from "../components/Error/Error";
  import { ErrorRequest } from "../interface/error";
  import { DashboardData } from "../interface/dashboard";
  import SideBar from "../components/SideBar/SideBar";

  export default function Home() {
    const [data, setData] = useState<DashboardData>();
    const [error, setError] = useState<ErrorRequest | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      const fetchDataDashboard = async () => {
        try {
          const url = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_URL : 'http://localhost:3001'
          const response = await fetch(`${url}/api/users/dashboard`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          });

          if (response.status === 401) {
            const errorData = await response.json();
            setError({ status: response.status, message: errorData.message });
          } else {
            const jsonData = await response.json();
            const dataExtrato: DashboardData = {
                receitas: jsonData.receitas as number[],
                gastos: jsonData.gastos as number[],
                labels: jsonData.labels as string[],
            }
            console.log("Dados do dashboard:", dataExtrato);
            setData(dataExtrato);
          }
        } catch (err) {
          console.error("Erro ao buscar dados:", err);
          setError({ status: 500, message: "Erro ao buscar dados." });
        } finally {
          setLoading(false);
        }
      };

      fetchDataDashboard();
    }, []);

    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <Error status={error.status} message={error.message} />
        ) : (
          <div className="flex flex-row gap-4 w-full min-h-screen">
            <SideBar />
            <div className="flex items-center justify-center w-full h-screen">
            {data ? (
              <Dashboard data={data} />
            ) : (
              <p>Erro: dados indisponíveis</p>
            )}
            </div>
          </div>
        )}
      </div>
    );
  }
