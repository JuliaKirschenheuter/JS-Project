const PhoneService = {

    _getPhones(url) {
        return fetch(url).then(response => response.json())
    },

    getAll() {
        return this._getPhones('https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/phones.json')
    },

    getById(phoneId) {
        return this._getPhones(`https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/${phoneId}.json`)
    },
};

export default PhoneService;
