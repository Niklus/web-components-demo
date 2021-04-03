import { LitElement, html } from 'lit-element';
import './you-tube/you-tube';

class AppRoot extends LitElement {
  static get properties() {
    return {
      myProp: { type: String },
      count: { type: Number },
      todos: { type: Array },
      player: { type: Object },
      video_id: { type: String },
    };
  }

  constructor() {
    super();
    this.myProp = 'Hello Web Components';
    this.count = 0;
    this.todos = ['code', 'train', 'sleep', 'repeat'];
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  play() {
    this.player.playVideo();
  }

  pause() {
    this.player.pauseVideo();
  }

  stop() {
    this.player.stopVideo();
  }

  playerReady(evt) {
    this.player = evt.target;
  }

  handleFormSubmit(e) {
    e.preventDefault();
    if (this.video_id) {
      this.player.loadVideoById(this.video_id);
    }
  }

  render() {
    return html`
      <div>
        <h1>${this.myProp}</h1>
        <h2>count: ${this.count}</h2>
        <button @click=${this.increment}>increment +</button>
        <button @click=${this.decrement}>decrement -</button>
        <h3>Todos</h3>
        <ul>
          ${this.todos.map((el) => html`<li>${el}</li>`)}
        </ul>
        <!--YouTube Web Component-->
        <you-tube
          height="390"
          width="640"
          video_id="YBwgkr_Sbx0"
          controls="0"
          autoplay="0"
          .onPlayerReady=${(e) => this.playerReady(e)}
        ></you-tube
        ><br />
        <button @click=${this.play}>Play</button>
        <button @click=${this.pause}>Pause</button>
        <button @click=${this.stop}>Stop</button>
        <form @submit=${(e) => this.handleFormSubmit(e)}>
          <input
            @change=${(e) => (this.video_id = e.target.value)}
            placeholder="Youtube Video ID"
            type="text"
          />
          <button>Load</button>
        </form>
      </div>
    `;
  }

  // remove shadow dom
  createRenderRoot() {
    return this;
  }
}

customElements.define('app-root', AppRoot);
