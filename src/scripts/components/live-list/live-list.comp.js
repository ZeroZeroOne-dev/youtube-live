import { Component } from "../../../001-lib/component/component.comp.js";
import { YoutubeService } from "../../services/youtube.service.js";
import { LiveComponent } from "../live/live.comp.js";

export class LiveListComponent extends Component {
    constructor() {
        super();

        YoutubeService.subscribe(s => this.draw(s));
    }

    async draw(streams) {
        this.container.replaceChildren();

        streams.forEach(stream => {
            this.container.appendChild(
                new LiveComponent(stream),
                document.createElement('hr')
            );
        });
    }
}
customElements.define('ytl-live-list', LiveListComponent);