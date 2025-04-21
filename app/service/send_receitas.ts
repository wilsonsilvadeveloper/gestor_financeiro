export const sendReceitas = async (data: Record<string, string | number | boolean>) => {
    const response = await fetch("http://localhost:3001/api/receitas", {
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