import baseURL from "./baseURL";

function login(formData) {
    const endpoint = '/api/auth/login';
    return fetch(baseURL() + endpoint, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData) 
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log('✅ Login successful:', data);
        
        if (data.status !== "Success") {
            throw new Error(data.message);
        }
        
        return data; 
    })
    .catch((error) => {
        console.error('❌ Login failed:', error);
        throw error;
    });
}

export default login;