import { Component } from "../../../001-lib/component/component.comp.js";
import { Channel } from "../../services/data.service.js";

export class SettingsChannelComponent extends Component {
    /** @type {Channel} */
    #channel;

    /** @type {() => void} */
    #callback;

    /** @param {Channel} channel */
    /** @param {() => void} deleteCallback */
    constructor(channel, deleteCallback) {
        super({
            template: 'scripts/components/settings-channel/settings-channel.comp.html',
            styleSheets: [
                'styles/classes.css',
                'scripts/components/settings-channel/settings-channel.comp.css'
            ]
        });

        this.#channel = channel;
        this.#callback = deleteCallback;
    }

    init() {
        this.getChild("#channel-name").innerText = this.#channel.handle;
        this.getChild("#channel-id").innerText = this.#channel.id;
        this.getChild(".remove-channel").addEventListener('click', this.#callback);
    }
}
customElements.define("ytl-settings-channel", SettingsChannelComponent);
