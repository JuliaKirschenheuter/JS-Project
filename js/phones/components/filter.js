'use strict';

import Component from "../../Component.js";

export default class Filter extends Component{
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