import { CONCEN } from "../../popups/POPUP_STATES.js";

export function User() {
    return Widget.Button({
        class_name: "user",
        on_clicked: () => {
            CONCEN.value = !CONCEN.value;
        },
    });
}
