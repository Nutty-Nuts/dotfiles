
function ToolTrayItem(icon, class_name, command_1, command_2 = '', command_3 = '') {
    const Button = Widget.Button({
        label: `${icon}`,
        class_name: `${class_name} tool-tray-item resizeable`,
        on_primary_click: () => {
            Utils.execAsync(command_1)
        },
        on_middle_click: () => {
            Utils.execAsync(command_2)
        }
    })

    return Button
}

const colorPicker = ToolTrayItem('', 'picker', ['hyprpicker', '-a'])
const screenshot = ToolTrayItem('󰄀', 'screenshot', ['hyprshot', '-z -m', 'region'], ['hyprshot', '-m', 'output'])
const launcher = ToolTrayItem('󰣛', 'launcher', ['ags', '-t', 'applauncher'])

export function ToolTray() {
    const ToolTray = Widget.Box({
        spacing: 6,
        class_name: 'tool-tray',
        children: [
            launcher,
            colorPicker,
            screenshot
        ]
    })

    return ToolTray
}
