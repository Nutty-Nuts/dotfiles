import GLib from "gi://GLib";
import brightness from "../services/brightness.js";

const brightness_slider = Widget.Slider({
    class_name: "speaker-osd-slider unset",
    hexpand: true,
    draw_value: false,
    value: brightness.bind("screen_value"),
    on_change: ({ value }) => (brightness.screen_value = value),
});

const brightness_icon = Widget.Label({
    class_name: "speaker-osd-icon",
    label: "",
});

const brightness_container = Widget.Box({
    class_name: "speaker-osd-container transparent shadow",
    children: [brightness_icon, brightness_slider],
});

export const BrightnessOSD = Widget.Window({
    class_name: "speaker-osd-window",
    name: "brightnessosd",
    visible: false,
    layer: "overlay",
    child: brightness_container,
    anchor: ["bottom"],
    margins: [0, 0, 96, 0],
});

let hideTimeoutId;
var screen_value;
var init = true;

Utils.watch("initial-label", [[brightness, "screen-changed"]], () => {
    if (!init) {
        screen_value = brightness.screen_value;
        init = true;
        return;
    }
    if (screen_value == brightness.screen_value) {
        return;
    }
    screen_value = brightness.screen_value;
    BrightnessOSD.visible = true;

    if (hideTimeoutId !== null) {
        GLib.source_remove(hideTimeoutId);
    }

    hideTimeoutId = Utils.timeout(2000, () => {
        BrightnessOSD.visible = false;
    });
});
