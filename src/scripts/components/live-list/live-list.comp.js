import { Component } from "../../base/component.comp.js";
import { YoutubeService } from "../../services/youtube.service.js";
import { LiveComponent } from "../live/live.comp.js";

export class LiveListComponent extends Component {
    constructor() {
        super();

        YoutubeService.subscribe(s => this.draw(s));
    }

    async draw(streams) {
        this.removeChildren();

        streams.forEach(stream => {
            this.appendChild(
                new LiveComponent(stream),
                document.createElement('hr')
            );
        });
    }
}
customElements.define('ytl-live-list', LiveListComponent);