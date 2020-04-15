'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from "./components/phone-viewer.js";
import Filter from "./components/filter.js";
import ShoppingCart from "./components/shopping-cart.js";
import PhoneService from './phone-service.js';
import Component from "../Component.js";


export default class PhonesPage extends Component{
    constructor({element}) {
        super({element})

        this._render();

        this._initPhoneCatalog();
        this._initPhoneViewer();
        this._initCart();
        this._initFilter();
    }

    _initPhoneCatalog() {
        this._catalog = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
            phones: PhoneService.getAll()
        });

        this._catalog.subscribe('phoneSelected', (phoneId) => {
            this._catalog.hide();
            let phoneDetails = PhoneService.getById(phoneId);
            this._viewer.show(phoneDetails);
        });

        this._catalog.subscribe('addToBasket', (phoneId) => {
            this._cart.add(phoneId)
        })
    }

    _initPhoneViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]')
        });

        this._viewer.subscribe('addToBasket', (phoneId) => {
            this._cart.add(phoneId);
        });

        this._viewer.subscribe('back', () => {
            this._viewer.hide();
            this._catalog.show()
        })
    }

    _initCart() {
        this._cart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]')
        });

        this._cart.subscribe('removePhone', (id) => {
            this._cart.remove(id)
        })
    }

    _initFilter() {
        this._filter = new Filter({
            element: this._element.querySelector('[data-component="filter"]')
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