

export default class Component {

    constructor({element}) {
        this._element = element;
        this._callbackMap = {}
    }

    hide() {
        this._element.hidden = true;
    }

    show() {
        this._element.hidden = false;
    }

    subscribe(eventName, callback) {
        if (!this._callbackMap.hasOwnProperty(eventName)) {
            this._callbackMap[eventName] = [];
        }
        this._callbackMap[eventName].push(callback)
    }

    emit(eventName, data) {
        let arrOfCallbacks = this._callbackMap[eventName] || [];
        arrOfCallbacks.forEach(callback => {
            callback(data)
        })
    }

    on (eventName, elementName, callback) {
        this._element.addEventListener(eventName, (event) => {
            const targetElement = event.target.closest(`[data-element="${elementName}"]`);
            if (!targetElement) return;
            callback(event)
        })
    }

}