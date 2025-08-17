import baseURL from "./baseURL";

function updateBirthday(authToken, birthdayId, birthdayData) {
    const endpoint = `/api/birthdays/${birthdayId}`;
    const url = baseURL() + endpoint;
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    };
    
    const requestBody = {
        first_name: birthdayData.name,
        last_name: birthdayData.lastName || null,
        birthday_date: birthdayData.birth_date,
        notify: birthdayData.notify !== undefined ? birthdayData.notify : true,
        notes: birthdayData.notes || null
    };
    
    console.log('🚀 Updating birthday with data:', requestBody);
    
    return fetch(url, { 
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(requestBody)
    })
    .then(res => {
        console.log('🔍 Response status:', res.status);
        console.log('🔍 Response ok:', res.ok);
        
        if (!res.ok) {
            return res.text().then(text => {
                console.log('🔍 Error response body:', text);
                throw new Error(`HTTP ${res.status}: ${text}`);
            });
        }
        return res.json();
    })
    .catch(error => {
        console.error('❌ Error in updateBirthday:', error);
        throw error;
    });
}

export default updateBirthday;