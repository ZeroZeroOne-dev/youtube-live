import { Component } from "../../base/component.comp.js";
import { InitService } from "../../services/init.service.js";
import { LiveListComponent } from "../live-list/live-list.comp.js";

export class AppComponent extends Component {
    constructor() {
        super();

        this.init();
    }

    async init(){
        await InitService.init();

        this.draw();
    }

    draw() {
        this.innerHTML = `
            <h1>Youtube Live</h1>
            <hr/>
        `;
        this.appendChild(new LiveListComponent())
    }
}
customElements.define('ytl-app', AppComponent);