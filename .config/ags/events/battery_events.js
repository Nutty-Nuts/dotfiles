import { notify } from "../services/notify.js";
import { play_sfx } from "../services/play.js";

const battery = await Service.import("battery");

let previous_charging_state;
let critical = false;
let power_saving = false;

function set_hyprland_opts(opts) {
    for (const property in opts) {
        Utils.execAsync(`hyprctl keyword ${property} ${opts[property]}`);
    }
}

function toggle_classnames(widgets, opts) {
    for (const widget of widgets) {
        for (const property in opts) {
            widget.child.toggleClassName(property, opts[property]);
        }
    }
}

export function battery_events() {
    Utils.timeout(50, () => {
        Utils.merge([battery.bind("charging"), battery.bind("percent")], (charging, percent) => {
            // improving battery life by disabling blur and shadows
            if (charging && power_saving == true) {
                set_hyprland_opts({
                    "decoration:blur:enabled": true,
                    "decoration:drop_shadow": true,
                    "decoration:rounding": 3,
                    "animations:enabled": true,
                });

                toggle_classnames(App.windows, {
                    transparent: true,
                    // shadow: true,
                });

                power_saving = false;
            }
            if (!charging && percent < 79 && power_saving == false) {
                set_hyprland_opts({
                    "decoration:blur:enabled": false,
                    "decoration:drop_shadow": false,
                    "decoration:rounding": 0,
                    "animations:enabled": false,
                });

                toggle_classnames(App.windows, {
                    transparent: false,
                    // shadow: false,
                });

                power_saving = true;
            }

            // notify when battery is low
            if (percent >= 0 && percent <= 25 && critical == false) {
                play_sfx("battery-low");
                notify("battery-low", "Battery Critical", "Battery is under 20%.");

                critical = true;
            }
            if (percent > 25 && critical == true) {
                critical = false;
            }

            // notify when charing, discharing, or suspended charging
            if (previous_charging_state == charging) {
                return;
            }
            if (previous_charging_state == false) {
                play_sfx("power-plug");
                notify("battery", "Charger Connected", `Battery charging from ${percent}%`);
            }
            if (previous_charging_state == true) {
                play_sfx("power-unplug");
                notify("battery", "Charger Disconnected", `Battery draining from ${percent}%`);
            }
            if (previous_charging_state == true && percent >= 79) {
                play_sfx("battery-full");
                notify("battery", "Charging Suspended", `Charging suspended at ${percent}%`);
            }
            previous_charging_state = charging;
        });
    });
}
