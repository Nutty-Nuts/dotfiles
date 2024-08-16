import { STATES } from "../../popups/POPUP_STATES.js"
import { CONCEN } from "../../popups/POPUP_STATES.js"

export function User() {
    return Widget.Button({
        class_name: "user",
        on_clicked: () => {
            console.log('here')
            let curr = STATES.value.control_center.visible
            STATES.value.control_center.visible = !(curr)
            console.log(STATES.value.control_center.visible)

            CONCEN.value = !(CONCEN.value)
        }
    })
}
