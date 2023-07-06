import { Component } from "../../../001-lib/component/component.comp.js";
import { YoutubeService } from "../../services/youtube.service.js";
import { LiveChannelComponent } from "../live-channel/live-channel.comp.js";

export class LiveListPageComponent extends Component {
    constructor() {
        super();

        YoutubeService.subscribe(s => this.draw(s));
    }

    async draw(streams) {
        this.root.replaceChildren();

        streams.forEach(stream => {
            this.root.appendChild(
                new LiveChannelComponent(stream),
                document.createElement('hr')
            );
        });
    }
}
customElements.define('ytl-live-list-page', LiveListPageComponent);