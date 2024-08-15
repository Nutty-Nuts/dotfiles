import { OutputVolume } from './output_volume.js'
import { InputVolume } from './input_volume.js'
import { Brightness } from './brightness.js'

export function QuickControls() {
    const quick_controls_container = Widget.Box({
        class_name: "quick-controls-container",
        spacing: 11,
        children: [
            OutputVolume(),
            InputVolume(),
            Brightness(),
        ]
    })

    return Widget.EventBox({
        child: quick_controls_container
    })
}
