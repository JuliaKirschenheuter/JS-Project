const PhoneService = {

    _getPhones(url) {
        return new Promise((resolve) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onload = () => {
                let data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            if(xhr.status !== 200) {
                console.log(`Server error: ${ xhr.status } ${ xhr.statusText }`);
                return [];
            }
        })
    },

    getAll() {
        return this._getPhones('https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/phones.json')
    },

    getById(phoneId) {
        return this._getPhones(`https://raw.githubusercontent.com/JuliaKirschenheuter/JS-Project/master/phones/${phoneId}.json`)
    },
};

export default PhoneService;
