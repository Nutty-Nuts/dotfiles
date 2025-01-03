import { MediaPlayerLayer } from "../../popups/media_player.js";
import { hover } from "../../popups/media_player.js";
import GLib from "gi://GLib";

const mpris = await Service.import("mpris");

export function Media() {
    var timeout;

    const button = Widget.Button({
        class_name: "toggle-media-player resizeable",
        css: "background-size: cover;",

        on_middle_click: () => mpris.getPlayer("spotify").playPause(),
        on_scroll_up: () => mpris.getPlayer("spotify").next(),
        on_scroll_down: () => mpris.getPlayer("spotify").previous(),
    }).hook(mpris, (self) => {
        let player = mpris.getPlayer("spotify") || mpris.getPlayer("");
        let { cover_path, track_title, track_artists } = player;

        self.css = `background-image: url('${cover_path}')`;
        self.tooltip_text = `${track_title} \nby ${track_artists}`;
    });

    button.connect("leave-notify-event", () => {
        if (MediaPlayerLayer.visible) {
            timeout = Utils.timeout(5000, () => {
                if (!hover) {
                    MediaPlayerLayer.visible = false;
                    console.log("timeout");
                }
            });
        }
    });

    button.connect("clicked", () => {
        if (MediaPlayerLayer.visible) {
            GLib.source_remove(timeout);
        }
        MediaPlayerLayer.visible = !MediaPlayerLayer.visible;
    });

    return button;
}
