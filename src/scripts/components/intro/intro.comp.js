import { Component } from "../../../001-lib/component/component.comp.js";
import { YoutubeService } from "../../services/youtube.service.js";

export class IntroComponent extends Component {

    constructor() {
        super({
            styleSheet: 'scripts/components/intro/intro.comp.css',
            template: 'scripts/components/intro/intro.comp.html'
        });
    }

    init() {
        this.getChild("#refresh").addEventListener('click', () => YoutubeService.refresh());
    }

}
customElements.define('ytl-intro', IntroComponent);