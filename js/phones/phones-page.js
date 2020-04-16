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
        this._showPhones();
    }

    async _showPhones() {
        const filteredData = this._filter.getCurrentData();
        let allPhones = await PhoneService.getAll(filteredData);
        this._catalog.show(allPhones);
    }

    _initPhoneCatalog() {
        this._catalog = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]')
        });

        this._catalog.subscribe('phoneSelected', async (phoneId) => {
            this._catalog.hide();
            let phone = await PhoneService.getById(phoneId);
            this._viewer.show(phone);
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

        this._viewer.subscribe('back', async () => {
            this._viewer.hide();
            await this._showPhones();
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