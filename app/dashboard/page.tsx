"use client";
import { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";
import Error from "../components/Error/Error";
import { ErrorRequest } from "../interface/error";

export default function Home() {
  const [data, setData] = useState<object | null>(null);
  const [error, setError] = useState<ErrorRequest | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataDashboard = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/users/dashboard", {
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
          setData(jsonData);
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
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <p>Carregando...</p>
      ) : error ? (
        <Error status={error.status} message={error.message} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}
