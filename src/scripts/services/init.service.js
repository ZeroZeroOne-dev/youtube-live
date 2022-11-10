import { TitleService } from "./title.service.js";
import { YoutubeService } from "./youtube.service.js";

export class InitService {
    static async init(){
        await YoutubeService.init();
        TitleService.init();
    }
}