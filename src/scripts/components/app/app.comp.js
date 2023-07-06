import { Component } from "../../../001-lib/component/component.comp.js";
import { RoutingComponent } from "../../../001-lib/routing/routing.comp.js";
import { InitService } from "../../services/init.service.js";
import { IntroComponent } from "../intro/intro.comp.js";
import { LiveListPageComponent } from "../live-list-page/live-list-page.comp.js";
import { SettingsPageComponent } from "../settings-page/settings-page.comp.js";

export class AppComponent extends Component {
    constructor() {
        super({
            template: 'scripts/components/app/app.comp.html'
        });

        RoutingComponent.setRouteMap({
            '#\/list': {
                component: LiveListPageComponent
            },
            '#\/settings': {
                component: SettingsPageComponent
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