import baseURL from "./baseURL";

function getEmpresas(authToken) {
    const endpoint = '/api/birthdays/';
    return fetch(baseURL() + endpoint, { 
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    })
    .then(res => res.json());
};

export default getEmpresas;