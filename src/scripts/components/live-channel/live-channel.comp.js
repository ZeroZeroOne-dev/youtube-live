import { Component } from "../../../001-lib/component/component.comp.js";
import { printDuration } from "../../utils/duration-print.util.js";

export class LiveChannelComponent extends Component {
    constructor(stream) {
        super({
            styleSheets: ['scripts/components/live-channel/live-channel.comp.css']
        });

        this.stream = stream;

        this.draw();
    }

    draw() {
        this.root.innerHTML = `
            <div class="bg-comp clickable">
                <h2>
                    ${this.stream.channel}
                </h2>
                <div class='subtitle'>
                    <h3 class='left'>${this.stream.title}</h3>
                    <h3 class='right'>${printDuration(this.stream.start)} - ${this.stream.viewers}</h3>
                </div>
            </div>
        `;

        this.root.addEventListener('click', () => this.openStream());
    }

    openStream() {
        window.open(`https://youtube.com/watch?v=${this.stream.id}`, '_blank');
    }
}
customElements.define('ytl-live', LiveChannelComponent);