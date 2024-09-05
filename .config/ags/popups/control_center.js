import { notify } from "../services/notify.js";
import { play_sfx } from "../services/play.js";
import { CONCEN } from "./POPUP_STATES.js";

const commands = {
    poweroff: "poweroff",
    reboot: "reboot",
    logout: "hyprctl dispatch exit",
    suspend: "systemctl suspend",
};
const icons = {
    poweroff: "system-shutdown",
    reboot: "system-reboot",
    logout: "system-log-out",
    suspend: "system-suspend",
};

function ActionButton(class_name, label, command = "", action = "", description = "", icon = "") {
    return Widget.Button({
        class_name: class_name,
        child: Widget.Label({
            label: label,
            css: "font-size: 20px; font-weight: bolder;",
        }),

        on_clicked: () => {
            notify(icon, action, description);
            play_sfx("desktop-logout", 0.5);

            Utils.timeout(1500, () => {
                Utils.execAsync(command);
            });
        },
    });
}

export function ControlCenter() {
    const poweroff = ActionButton("poweroff", "⏻", commands.poweroff, "Power Off", "Powering Off Machine", icons.poweroff);
    const reboot = ActionButton("reboot", "", commands.reboot, "Reboot", "Rebooting Machine", icons.reboot);
    const logout = ActionButton("logout", "󰍃", commands.logout, "Log Out", "Logging Out User", icons.logout);
    const suspend = ActionButton("suspend", "󰤄", commands.suspend, "Suspend", "Suspending Machine ", icons.suspend);

    const container = Widget.Box({
        spacing: 8,
        class_name: "container transparent shadow",
        children: [poweroff, reboot, suspend, logout],
    });

    const window = Widget.Window({
        name: "control_center",
        class_name: "control-center",
        anchor: ["top", "right"],
        layer: "top",
        visible: false,
        child: container,
    }).hook(CONCEN, (self) => {
        self.visible = CONCEN.value;
    });

    return window;
}
