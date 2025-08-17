import baseURL from "./baseURL";

function deleteBirthday(authToken, birthdayId) {
    const endpoint = `/api/birthdays/${birthdayId}`;
    const url = baseURL() + endpoint;
    
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    };
    
    console.log('🚀 Deleting birthday with ID:', birthdayId);
    
    return fetch(url, { 
        method: 'DELETE',
        headers: headers
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
        
        // DELETE might return empty response
        if (res.status === 204) {
            return { message: 'Birthday deleted successfully' };
        }
        
        return res.json();
    })
    .catch(error => {
        console.error('❌ Error in deleteBirthday:', error);
        throw error;
    });
}

export default deleteBirthday;