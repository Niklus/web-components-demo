import { LitElement, html } from 'lit-element';
import './you-tube.css';

class YouTube extends LitElement {
  static get properties() {
    return {
      width: { type: String },
      height: { type: String },
      video_id: { type: String },
      autoplay: { type: String },
      controls: { type: String },
      onPlayerReady: { type: Function },
      onPlayerStateChange: { type: Function },
      onPlaybackQualityChange: { type: Function },
      onPlaybackRateChange: { type: Function },
      onApiChange: { type: Function },
      onError: { type: Function },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    if ('YT' in window) {
      this.constructPlayer(window['YT']);
    } else {
      this.loadApi()
        .then((YT) => this.constructPlayer(YT))
        .catch((err) => console.log(err));
    }
  }

  constructPlayer(YT) {
    new YT.Player('player', {
      height: this.height,
      width: this.width,
      videoId: this.video_id,
      playerVars: { autoplay: this.autoplay, controls: this.controls },
      events: {
        onReady: (event) => this.ready(event),
        onStateChange: (event) => this.stateChange(event),
        onPlaybackQualityChange: (event) => this.playbackQualityChange(event),
        onApiChange: (event) => this.apiChange(event),
        onPlaybackRateChange: (event) => this.playbackRateChange(event),
        onError: (event) => this.error(event),
      },
    });
  }

  loadApi() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    return new Promise((resolve) => {
      window['onYouTubeIframeAPIReady'] = () => {
        resolve(window['YT']);
      };
    });
  }

  ready(event) {
    if (this.onPlayerReady) {
      this.onPlayerReady(event);
    }
  }

  stateChange(event) {
    if (this.onPlayerStateChange) {
      this.onPlayerStateChange(event);
    }
  }

  error(event) {
    if (this.onError) {
      this.onError(event);
    }
  }

  apiChange(event) {
    if (this.onApiChange) {
      this.onApiChange(event);
    }
  }

  playbackQualityChange(event) {
    if (this.onPlaybackQualityChange) {
      this.onPlaybackQualityChange(event);
    }
  }

  playbackRateChange(event) {
    if (this.onPlaybackRateChange) {
      this.onPlaybackRateChange(event);
    }
  }

  render() {
    return html` <div id="player"></div> `;
  }

  // remove shadow dom
  createRenderRoot() {
    return this;
  }
}

customElements.define('you-tube', YouTube);
