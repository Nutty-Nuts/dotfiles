import { Launcher } from '../../launcher/launcher.js'

export function ToggleLauncher() {
    return Widget.Button({
        label: '',
        class_name: 'launcher-button resizeable',
        on_clicked: () => {
            Launcher.visible = !(Launcher.visible)
        }
    })
}
