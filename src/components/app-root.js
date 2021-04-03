import { LitElement, html } from 'lit-element';
import './you-tube/you-tube';

class AppRoot extends LitElement {
  static get properties() {
    return {
      myProp: { type: String },
      count: { type: Number },
      todos: { type: Array },
    };
  }

  constructor() {
    super();
    this.myProp = 'Hello Web Components!';
    this.count = 0;
    this.todos = ['code', 'eat', 'train', 'repeat'];
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  // https://lit-element.polymer-project.org/guide/templates
  render() {
    return html`
      <div>
        <p>${this.myProp}</p>
        <p>count: ${this.count}</p>
        <button @click=${this.increment}>increment +</button> |
        <button @click=${this.decrement}>decrement -</button>
        <p>Todos</p>
        <ul>
          ${this.todos.map((el) => html`<li>${el}</li>`)}
        </ul>
        <you-tube
          height="390"
          width="640"
          video_id="YBwgkr_Sbx0"
          controls="0"
          autoplay="0"
        ></you-tube>
      </div>
    `;
  }

  // remove shadow dom
  createRenderRoot() {
    return this;
  }
}

customElements.define('app-root', AppRoot);
