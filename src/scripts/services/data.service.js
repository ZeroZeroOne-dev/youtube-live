export class Channel {
    /** @type {string} */
    handle;

    /** @type {string} */
    id;
}

export class DataService {
    static #LIST_KEY = "YTL_CHANNEL_LIST";

    /** @returns {Channel[]} */
    static readChannelList() {
        const rawList = localStorage.getItem(DataService.#LIST_KEY);
        if (rawList == null) return [];
        return JSON.parse(rawList);
    }

    /** @param {Channel[]} channels  */
    static storeChannels(channels) {
        const rawList = JSON.stringify(channels);
        localStorage.setItem(DataService.#LIST_KEY, rawList);
    }
}
