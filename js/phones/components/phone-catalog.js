'use strict';

import Component from "../../Component.js";

export default class PhoneCatalog extends Component{

    constructor({element}) {
        super({element});
        this._phones = [];

        this.on('click', 'phone-link', (event) => {
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