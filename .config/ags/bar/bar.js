import { Battery } from "./modules/battery.js";
import { Date } from "./modules/date.js";
import { Workspaces } from "./modules/workspaces.js";
import { User } from "./modules/user.js";
// import { NetworkOld } from './modules/network.js'
import { Network } from "./modules/network.js";
import { SystemTray } from "./modules/systemtray.js";
import { Media } from "./modules/media.js";
import { ToolTray } from "./modules/tool-tray.js";
import { QuickControls } from "./modules/quick_controls/quick_controls.js";

function Left() {
    return Widget.Box({
        spacing: 4,
        children: [
            // ToggleLauncher(),
            Media(),
            ToolTray(),
            Workspaces(),
        ],
    });
}

function LeftExtra() {
    return Widget.Box({
        spacing: 4,
        children: [
            // ToggleLauncher(),
            // ToolTray(),
            Workspaces(),
        ],
    });
}

function Center() {
    return Widget.Box({
        spacing: 8,
        children: [
            Date(),
            // Picker(),
        ],
    });
}
function Right() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [
            Widget.Box({
                spacing: 4,
                children: [
                    SystemTray(),
                    // Audio(),
                    QuickControls(),
                ],
            }),
            Battery(),
            // NetworkOld(),
            Network(),
            User(),
        ],
    });
}

function RightExtra() {
    return Widget.Box({
        hpack: "end",
        spacing: 8,
        children: [Battery(), Network(), User()],
    });
}

export function Bar() {
    return Widget.Window({
        monitor: 0,
        name: "agsbar-0",
        visible: true,
        class_name: "bar-window",
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            class_name: "bar-container transparent",
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        }),
    });
}

export function BarExtra(monitor = 1) {
    return Widget.Window({
        monitor,
        name: `agsbar-${monitor}`,
        visible: true,
        class_name: "bar-window-1",
        anchor: ["top", "left", "right"],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            class_name: "bar-container-1 transparent",
            start_widget: LeftExtra(),
            center_widget: Center(),
            end_widget: RightExtra(),
        }),
    });
}
