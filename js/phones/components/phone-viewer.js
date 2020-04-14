'use strict';

import Component from "../../Component.js";

export default class PhoneViewer extends Component{

    constructor({element}) {
        super({element});
    }

    show(phoneDetails) {
        super.show()
        this._phoneDetails = phoneDetails;

        this._render();

        this._element.addEventListener('click', (event) => {
            const backButton = event.target.closest('[data-element="back-button"]');
            if (!backButton) return;
            this.emit('back', null);
        })

        this._element.addEventListener('click', (event) => {
            const addButton =  event.target.closest('[data-element="add-button"]')
            if(!addButton) return;
            this.emit('addToBasket', this._phoneDetails.id);
        })

    }

    _render() {

        let phone = this._phoneDetails;

        this._element.innerHTML = `
          <img 
          class="phone"
          src="${ phone.images[0] }"
          data-element="phone"
          data-phone-id="${phone.id}"
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
            <li>
              <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
            </li>
            <li>
              <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
            </li>
            <li>
              <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
            </li>
            <li>
              <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
            </li>
            <li>
              <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
            </li>
            <li>
              <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
            </li>
          </ul>
        `
    }
}