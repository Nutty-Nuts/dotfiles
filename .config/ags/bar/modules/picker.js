export function Picker() {
    return Widget.Button({
        label: '',
        class_name: 'picker',
        on_clicked: () => {
            Utils.execAsync(['hyprpicker', '-a'])
        }
    })
}
