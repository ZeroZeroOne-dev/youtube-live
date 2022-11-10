import { Component } from "../../base/component.comp.js";
import { printDuration } from "../../utils/duration-print.util.js";

export class LiveComponent extends Component {
    constructor(stream) {
        super('scripts/components/live/live.comp.css');

        this.stream = stream;

        this.draw();
    }

    draw() {
        this.innerHTML = `
            <div>
                <h2>
                    <a href="https://youtube.com/watch?v=${this.stream.id}" target="_blank">
                        ${this.stream.channel}
                    </a>
                </h2>
                <div class='subtitle'>
                    <h3 class='left'>${this.stream.title}</h3>
                    <h3 class='right'>${printDuration(this.stream.start)} - ${this.stream.viewers}</h3>
                </div>
            </div>
        `;
    }
}
customElements.define('ytl-live', LiveComponent);