import { Component } from "../../base/component.comp.js";
import { YoutubeService } from "../../services/youtube.service.js";
import { LiveComponent } from "../live/live.comp.js";

export class LiveListComponent extends Component {
    constructor() {
        super();

        this.draw();
    }

    async draw() {
        const streams = await YoutubeService.getLiveVideos();

        streams.forEach(stream => {
            this.appendChild(new LiveComponent(stream));
            this.appendChild(document.createElement('hr'));
        });
    }
}
customElements.define('ytl-live-list', LiveListComponent);