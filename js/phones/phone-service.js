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
        this._getPhones()
    },

    getById(phoneId, callback) {
        return phoneDetails;
    },
};

export default PhoneService;
