import { Battery } from './modules/battery.js'
import { Date } from './modules/date.js'
import { Workspaces } from './modules/workspaces.js'
import { User } from './modules/user.js'
// import { NetworkOld } from './modules/network.js'
import { Network } from './modules/network.js'
import { SystemTray } from './modules/systemtray.js'
import { Media } from './modules/media.js'
import { ToolTray } from './modules/tool-tray.js'
import { QuickControls } from './modules/quick_controls/quick_controls.js'

function Left() {
    return Widget.Box({
        spacing: 4,
        children: [
            // ToggleLauncher(),
            Media(),
            ToolTray(),
            Workspaces(),
        ]
    })
}
function Center() {
    return Widget.Box({
        spacing: 8,
        children: [
            Date(),
            // Picker(),
        ]
    })
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
                    QuickControls()
                ]
            }),
            Battery(),
            // NetworkOld(),
            Network(),
            User(),
        ]
    })
}

export function Bar(monitor = 0) {
    const bar = Widget.Window({
        monitor,
        name: 'agsbar',
        visible: true,
        class_name: 'bar-window',
        anchor: ['top', 'left', 'right'],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            class_name: 'bar-container',
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right(),
        })
    })
}
