import baseURL from "./baseURL";

function newBirthday(authToken, birthdayData) {
    const endpoint = '/api/birthdays/';
    const url = baseURL() + endpoint;
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    };
    
    // Transform data to match your Birthday model
    const requestBody = {
        first_name: birthdayData.name,
        last_name: birthdayData.lastName || null, // Optional field
        birthday_date: birthdayData.birth_date,
        notify: birthdayData.notify !== undefined ? birthdayData.notify : true,
        notes: birthdayData.notes || null,
        user_id: birthdayData.user_id
    };
    
    console.log('🚀 Creating birthday with data:', requestBody);
    
    return fetch(url, { 
        method: 'POST',
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
        console.error('❌ Error in newBirthday:', error);
        throw error;
    });
}

export default newBirthday;