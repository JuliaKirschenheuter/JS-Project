const PhoneService = {

    async _getPhones(url) {
        return fetch(url).then(response => response.json());
    },

    async getAll({query = '', orderBy = 'age'} = {}) {
        let phones = await this._getPhones('https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/phones.json')
        const filteredPhones= this._filter(phones, query)
        return this._sort(filteredPhones, orderBy)
    },

    async getById(phoneId) {
       return await this._getPhones(`https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/${phoneId}.json`);
    },

    _filter(phones, query) {
        const normalizedQuery = query.toLowerCase()
        return phones.filter(phone => {
            return phone.name.toLowerCase().includes(normalizedQuery);
        })
    },

    _sort(phones, orderBy) {
        return phones.sort((phoneA, phoneB) => {
            return phoneA[orderBy] > phoneB[orderBy] ? 1 : -1
        })
    }
};

export default PhoneService;
