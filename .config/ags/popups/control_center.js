import { STATES } from "./POPUP_STATES.js"
import { CONCEN } from "./POPUP_STATES.js"
const debug_button = true

const commands = {
    poweroff: 'poweroff',
    reboot: 'reboot',
    logout: 'hyprctl dispatch exit',
}
const system_icons = {
    poweroff: 'system-shutdown',
    reboot: 'system-reboot',
    logout: 'system-log-out',
}

function ActionButton(class_name, label, command = "", action = "", description = "", icon = "") {
    return Widget.Button({
        class_name: class_name,
        child: Widget.Label({
            label: label,
            css: 'font-size: 20px; font-weight: bolder;'
        }),

        on_clicked: () => {
            if (debug_button) {
                Utils.execAsync(`notify-send -i "${icon}" "${action}" "${description}"`)
            }

            Utils.timeout(2000, () => {
                Utils.execAsync(command)
            })
        }
    })
}

export function ControlCenter() {
    const poweroff = ActionButton('poweroff', '⏻', commands.poweroff, 'Power Off', 'Powering Off Machine', system_icons.poweroff)

    const reboot = ActionButton('reboot', '', commands.reboot, 'Reboot', 'Rebooting Machine', system_icons.reboot)

    const logout = ActionButton('logout', '󰍃', commands.logout, 'Log Out', 'Logging Out User', system_icons.logout)

    const container = Widget.Box({
        spacing: 8,
        class_name: 'container',
        children: [
            poweroff,
            reboot,
            logout,
        ]
    })

    const window = Widget.Window({
        name: 'control_center',
        class_name: 'control-center',
        anchor: ['top', 'right'],
        layer: 'top',
        // visible: STATES.bind().as((obj) => {
        //     console.log(obj)
        //     console.log(obj.control_center.visible)
        //     return obj.control_center.visible
        // }),
        visible: CONCEN.bind(),
        child: container
    })


    return window
} 
