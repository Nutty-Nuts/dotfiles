import { Bar } from "./bar/bar.js";
import { Launcher } from "./popups/launcher.js";
import { NotificationPopupLayer } from "./popups/notification.js";
import { SpeakerOSDWindow } from "./popups/speaker_osd.js";
import { ControlCenter } from "./popups/control_center.js";
import { MediaPlayerLayer } from "./popups/media_player.js";
import { BrightnessOSD } from "./popups/brightness_osd.js";
import { Clock } from "./widgets/clock.js";
import { Playing } from "./widgets/playing.js";

import { battery_events } from "./events/battery_events.js";
import { audio_events } from "./events/audio_events.js";

const scss = `${App.configDir}/style.scss`;
const css = `${App.configDir}/style.css`;

battery_events();
audio_events();

Utils.exec(`sassc ${scss} ${css}`);
App.resetCss();
App.applyCss(css);

Utils.monitorFile(
    // directory that contains the scss files
    `${App.configDir}/style.scss`,

    // reload function
    function () {
        // compile, reset, apply
        print("applying updated scss");
        Utils.exec(`sassc ${scss} ${css}`);
        App.resetCss();
        App.applyCss(css);
    }
);

export const BarLayer = Bar();

App.config({
    iconTheme: "Colloid-Yellow-Gruvbox-Dark",
    style: css,
    windows: [BarLayer, Launcher, MediaPlayerLayer, NotificationPopupLayer, SpeakerOSDWindow, BrightnessOSD, ControlCenter(), Clock(), Playing()],
});
