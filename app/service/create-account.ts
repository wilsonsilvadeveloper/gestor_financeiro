const CreateNewAccount = async (data: Record<string, string | number | boolean>) => {
    const response = await fetch('http://localhost:3001/users/create-account', {
        method: 'POST',
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