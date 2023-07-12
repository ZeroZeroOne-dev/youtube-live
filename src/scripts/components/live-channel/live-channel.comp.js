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
                <h3>
                    ${this.stream.channel}
                </h3>
                <div class='subtitle'>
                    <span class='left'>${this.stream.title}</span>
                    <span class='right'>${printDuration(this.stream.start)} - ${this.stream.viewers}</span>
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