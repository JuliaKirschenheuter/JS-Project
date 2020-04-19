'use strict';
import Component from "../../Component.js";

export default class ShoppingCart extends Component{

    constructor({element}) {
        super ({element});
        this._items = [];
        this._render();

        this.on('click', 'remove-button', (event) => {
            let button = event.target;
            this.remove(button.dataset.itemId);
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