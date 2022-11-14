import { Component } from "../../../001-lib/component/component.comp.js";
import { RoutingComponent } from "../../../001-lib/routing/routing.comp.js";
import { InitService } from "../../services/init.service.js";
import { IntroComponent } from "../intro/intro.comp.js";
import { LiveListComponent } from "../live-list/live-list.comp.js";

export class AppComponent extends Component {
    constructor() {
        super({
            template: 'scripts/components/app/app.comp.html'
        });

        RoutingComponent.setRouteMap({
            '#\/list': {
                component: LiveListComponent
            },
            '': {
                redirect: '/list'
            }
        });
    }

    async init() {
        await InitService.init();

        // Not sure yet if i want to go this route
        const toReplace = this.getChild('#replace');
        this.container.replaceChild(new IntroComponent(), toReplace);
    }
}
customElements.define('ytl-app', AppComponent);