'use strict';

export default class PhoneCatalog {

    constructor({element, phones}) {
        this._element = element;
        this._phones = phones;

        this._render();

        this._element.addEventListener('click', (event) => {
            const phoneLink = event.target.closest('[data-element="phone-link"]');
            if (!phoneLink) return;
            const phoneElement = phoneLink.closest('[data-element="phone"]');
            console.log('phone selected', phoneElement.dataset.phoneId)
        })
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
                    <a class="btn btn-success">
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