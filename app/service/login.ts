const Login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
}

export default Login;