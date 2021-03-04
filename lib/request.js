const axios = require('axios');

const get = async (link) => {
    return await axios.get(link);
}

const post = async (link, data) => {
    return await axios.post(link, data);
}

const put = async (link, data) => {
    return await axios.put(link, data);
}


module.exports = {
    get, post, put
}