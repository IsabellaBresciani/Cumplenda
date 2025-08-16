import baseURL from "./baseURL";

function register(data, authToken) {
    const endpoint = '/api/auth/register';
    console.log("REGISTERING")
    return fetch(baseURL() + endpoint, { 
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body: JSON.stringify(data) 
    });
};

export default register;