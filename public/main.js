/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);




let currentPage = new _phones_phones_page_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    element: document.querySelector('[data-page-container]'),
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhonesPage; });
/* harmony import */ var _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _components_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _phone_service_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3);










class PhonesPage extends _Component_js__WEBPACK_IMPORTED_MODULE_5__["default"]{
    constructor({element}) {
        super({element})

        this._render();

        this._initPhoneCatalog();
        this._initPhoneViewer();
        this._initCart();

        this._initFilter();
        this._showPhones();
    }

    async _showPhones() {
        const filteredData = this._filter.getCurrentData();
        let allPhones = await _phone_service_js__WEBPACK_IMPORTED_MODULE_4__["default"].getAll(filteredData);
        this._catalog.show(allPhones);
    }

    _initPhoneCatalog() {
        this._catalog = new _components_phone_catalog_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
            element: this._element.querySelector('[data-component="phone-catalog"]')
        });

        this._catalog.subscribe('phoneSelected', async (phoneId) => {
            this._catalog.hide();
            let phone = await _phone_service_js__WEBPACK_IMPORTED_MODULE_4__["default"].getById(phoneId);
            this._viewer.show(phone);
        });

        this._catalog.subscribe('addToBasket', (phoneId) => {
            this._cart.add(phoneId)
        })
    }

    _initPhoneViewer() {
        this._viewer = new _components_phone_viewer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
            element: this._element.querySelector('[data-component="phone-viewer"]')
        });

        this._viewer.subscribe('addToBasket', (phoneId) => {
            this._cart.add(phoneId);
        });

        this._viewer.subscribe('back', async () => {
            this._viewer.hide();
            await this._showPhones();
        })
    }

    _initCart() {
        this._cart = new _components_shopping_cart_js__WEBPACK_IMPORTED_MODULE_3__["default"]({
            element: this._element.querySelector('[data-component="shopping-cart"]')
        });

        this._cart.subscribe('removePhone', (id) => {
            this._cart.remove(id)
        })
    }

    _initFilter() {
        this._filter = new _components_filter_js__WEBPACK_IMPORTED_MODULE_2__["default"]({
            element: this._element.querySelector('[data-component="filter"]')
        });

        this._filter.subscribe('queryChanged', async () => {
            await this._showPhones();
        })

        this._filter.subscribe('orderChanged', async () => {
            await this._showPhones();
        })
    }

    _render() {
        this._element.innerHTML = `
            <div class="row">
                <!--Sidebar-->
                <div class="col-md-2">
                  <section>
                    <div data-component="filter"></div>
                  </section>
            
                  <section>
                    <div data-component="shopping-cart"></div>
                  </section>
                </div>
            
                <!--Main content-->
                <div class="col-md-10">
                  <div data-component="phone-catalog"></div>
                  <div data-component="phone-viewer" hidden></div>
                </div>
            </div>
        `
    }
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneCatalog; });
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




class PhoneCatalog extends _Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{

    constructor({element}) {
        super({element});
        this._phones = [];

        this.on('click', 'phone', (event) => {
            const phone = event.target.closest('[data-element="phone"]');
            this.emit('phoneSelected', phone.dataset.phoneId);
        });

        this.on('click', 'add-button', (event) => {
            const phone = event.target.closest('[data-element="phone"]');
            this.emit('addToBasket', phone.dataset.phoneId);
        });
    }

    show(phones) {
        super.show();
        this._phones = phones;
        this._render();
    }

    _render() {
        this._element.innerHTML = `
        <ul class="phones">
            
            ${ this._phones.map( phone => 
                `<li class="thumbnail"
                  data-element="phone"
                  data-phone-id="${phone.id}"
                  >
                  <a
                   data-element="phone-link"
                   href="#!/phones/${phone.id}" 
                   class="thumb"
                   >
                    <img alt="${phone.name}" src="${phone.imageUrl}">
                  </a>
        
                  <div class="phones__btn-buy-wrapper">
                    <a 
                    data-element="add-button"
                    class="btn btn-success">
                      Add
                    </a>
                  </div>
        
                  <a data-element="phone-link"
                  href="#!/phones/${phone.id}"
                  >
                    ${phone.name}</a>
                  <p>${phone.snippet}</p>
                </li>
            `).join('')}
        </ul>
        `
    }

}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Component; });


class Component {

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

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PhoneViewer; });
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




class PhoneViewer extends _Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{

    constructor({element}) {
        super({element});
    }

    show(phoneDetails) {
        super.show()
        this._phoneDetails = phoneDetails;

        this._render();

        this.on('click', 'back-button', () => {
            this.emit('back', null);
        });

        this.on('click', 'add-button', () => {
            this.emit('addToBasket', this._phoneDetails.id);
        });

        this.on('click', 'small-image', (event) => {
            let smallImage = event.target;
            let largeImage = this._element.querySelector('[data-element="large-image"]');
            largeImage.src = smallImage.src;
        })

    }

    _render() {

        let phone = this._phoneDetails;

        this._element.innerHTML = `
          <img 
          class="phone"
          src="${ phone.images[0] }"
          data-element="large-image"
          >

          <button
          data-element="back-button"
          >Back</button>
          
          <button
          data-element="add-button"
          >Add to basket</button>
      
          <h1>${phone.name}</h1>
      
          <p>${phone.description}</p>
          <ul class="phone-thumbs">
            ${phone.images.map(imageUrl => 
                `
                    <li>
                        <img 
                        data-element="small-image"
                        src="${imageUrl}"
                        >
                    </li>
                `
            ).join('')}
          </ul>
        `
    }
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Filter; });
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




class Filter extends _Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor({element}) {
        super({element});
        this._render();

        const emitQueryChangedWithDebounce = _.debounce((event) => {
                this.emit('queryChanged', event.target.value)
            }, 500);

        this.on('input', 'query-field', emitQueryChangedWithDebounce)

        this.on('change', 'order-field', (event) => {
            this.emit('orderChanged', event.target.value)
        })
    }

    getCurrentData() {
        let orderField = this._element.querySelector('[data-element="order-field"]');
        let queryFiled = this._element.querySelector('[data-element="query-field"]');
        return {
            query: queryFiled.value,
            orderBy: orderField.value
        }
    }

    _render() {
        this._element.innerHTML = `
          <p>
            Search:
            <input
            data-element="query-field"
            >
          </p>
    
          <p>
            Sort by:
            <select
            data-element="order-field"
            >
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>
        `
    }
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShoppingCart; });
/* harmony import */ var _Component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);



class ShoppingCart extends _Component_js__WEBPACK_IMPORTED_MODULE_0__["default"]{

    constructor({element}) {
        super ({element});
        this._items = [];
        this._render();

        this.on('click', 'remove-button', (event) => {
            let idToRemove = event.target.dataset.itemId
            this.emit('removePhone', idToRemove);
        })
    }

    add (phoneId) {
        this._items.push(phoneId);
        this._render()
    }

    remove (phoneId) {
        this._items = this._items.filter(itemId => itemId !== phoneId)
        this._render()
    }

    _render() {
        this._element.innerHTML = `
          <p>Shopping Cart</p>
          <ul>
            ${this._items.map(itemId => `
                <li>
                 ${itemId}
                </li>
                
                <button
                    data-element="remove-button"
                    data-item-id="${itemId}"
                > X </button>
            `).join('')}
          </ul>
        `
    }
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (PhoneService);


/***/ })
/******/ ]);