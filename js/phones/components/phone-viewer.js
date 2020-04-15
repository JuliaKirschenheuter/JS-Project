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