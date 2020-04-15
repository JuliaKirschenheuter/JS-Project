const PhoneService = {

    _getPhones(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = () => {
            if(xhr.status !== 200) {
                console.log(`Server error: ${ xhr.status } ${ xhr.statusText }`);
                return [];
            }
            let data = JSON.parse(xhr.responseText);
            callback(data);
        }
    },

    getAll(callback) {
        this._getPhones('https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/phones.json', callback)
    },

    getById(phoneId, callback) {
        this._getPhones(`https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/${phoneId}.json`, callback)
    },
};

export default PhoneService;
