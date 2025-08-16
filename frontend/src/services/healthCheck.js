import baseURL from "./baseURL";

function healthCheck() {
    const endpoint = '/api/checkhealth';
    return fetch(baseURL() + endpoint, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status !== 'Success') throw new Error(data.message);

        return data.message;
    });
};

export default healthCheck;