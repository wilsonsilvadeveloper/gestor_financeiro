const CreateNewAccount = async (data: Record<string, string | number | boolean>) => {
    const url = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_URL : 'http://localhost:3001'
    const response = await fetch(`${url}/api/users/create-account`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

export default CreateNewAccount;