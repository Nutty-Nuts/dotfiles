import { notify } from "../services/notify.js";
import { play_sfx } from "../services/play.js";

const audio = await Service.import("audio");

export function audio_events() {
    let audio_init = false;
    let speakers_size;

    Utils.merge([audio.bind("speakers")], (speakers) => {
        if (speakers.length <= 1 && audio_init == false) {
            console.log("speakers-init", speakers.length);
            speakers_size = speakers.length;
            return;
        }

        if (speakers_size == speakers.length) {
            return;
        }
        audio_init = true;
        if (speakers_size < speakers.length) {
            notify("audio-speakers", "New Output", speakers[speakers.length - 1].description);
            play_sfx("device-added");
        }
        if (speakers_size > speakers.length) {
            notify("audio-speakers", "Output Removed", "An output device was removed");
            play_sfx("device-removed");
        }
        speakers_size = speakers.length;
    });
}
