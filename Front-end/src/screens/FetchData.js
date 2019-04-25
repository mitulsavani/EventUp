const URI = 'http://localhost:5200';

export default {
    async fetchUsers() {
        try {
                let response = await fetch(URI + '/users');
                let responseJsonData = await response.json();
                return responseJsonData;
            }
        catch(e) {
            console.log(e)
        }
    }
}