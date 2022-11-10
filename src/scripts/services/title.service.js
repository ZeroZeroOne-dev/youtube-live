import { YoutubeService } from "./youtube.service.js";

export class TitleService {
    static init() {
        YoutubeService.subscribe(s => document.title = `Youtube live (${s.length})`);
    }
}