const jwt  = require('jsonwebtoken');
const axios = require('axios');

async function isAuthenticated() {
    try{
        let result = await axios.get('/api/v1/login/check')
        console.log(result)
        if (result.status === 200){
            return true
        }
    }
    catch{
        return false
    }
}

export {isAuthenticated}