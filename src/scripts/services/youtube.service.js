import { CONFIG } from "../config/config.js";

export class YoutubeService {
    static #CLIENT;
    static #CALLBACKS = [];
    static #STREAMS = [];

    static async init() {
        await new Promise((resolve, reject) => {
            gapi.load('client', async () => {
                try {
                    await gapi.client.init({
                        apiKey: CONFIG.YT_KEY,
                        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
                    });

                    this.#CLIENT = gapi.client.youtube;
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });

        setInterval(async () => {
            await this.refresh();
        }, 1000 * 60 * 10);
        await this.refresh();
    }

    static async refresh(){
        const streams = await this.#getLiveVideos();
        this.#STREAMS = streams;
        this.#CALLBACKS.forEach(c => c(streams));
    }

    static async #getLiveVideos() {
        const playlists = this.#getUploadsPlaylistIds();

        const getVideoIds = playlists.map(p => this.#getLastPlaylistVideoId(p));
        const videoIds = await Promise.all(getVideoIds);
        const videos = await this.#getVideos(videoIds);

        return videos
            .filter(v => v.snippet.liveBroadcastContent == 'live')
            .map(v => ({
                channel: v.snippet.channelTitle,
                id: v.id,
                title: v.snippet.title,
                viewers: v.liveStreamingDetails.concurrentViewers,
                start: v.liveStreamingDetails.actualStartTime,
            }));
    }

    static #getUploadsPlaylistIds() {
        return CONFIG.CHANNELS.map(ci => ci.replace('UC', 'UU'));
    }

    static async #getLastPlaylistVideoId(playlistId) {
        const listResponse = await this.#CLIENT.playlistItems.list({
            part: [
                'contentDetails'
            ],
            fields: [
                'items(contentDetails/videoId)'
            ],
            maxResults: 1,
            playlistId: playlistId
        });
        return listResponse.result.items[0].contentDetails.videoId;
    }

    static async #getVideos(videoIds) {
        const videosResponse = await this.#CLIENT.videos.list({
            part: [
                'snippet,liveStreamingDetails'
            ],
            fields: [
                'items(id,snippet(title,liveBroadcastContent,channelTitle),liveStreamingDetails(concurrentViewers,actualStartTime))'
            ],
            id: videoIds
        });

        return videosResponse.result.items;
    }

    static subscribe(callback) {
        this.#CALLBACKS.push(callback);
        callback(this.#STREAMS);
    }
}