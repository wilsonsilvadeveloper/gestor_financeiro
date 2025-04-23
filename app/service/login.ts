const Login = async (email: string, password: string) => {
    const url = process.env.NODE_ENV === 'production' ? process.env.BACKEND_URL : 'http://localhost:3001'
    const response = await fetch(`${url}/api/users/login`, {
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