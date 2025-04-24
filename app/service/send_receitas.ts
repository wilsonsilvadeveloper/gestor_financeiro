export const sendReceitas = async (data: Record<string, string | number | boolean>) => {
    const url = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_URL : 'http://localhost:3001'
    const response = await fetch(`${url}/api/receitas`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.message || "Erro ao enviar dados");
    }
    return responseData;
}