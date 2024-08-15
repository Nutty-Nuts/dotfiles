import brightness from '../../../services/brightness.js'

export function Brightness() {
    let active = false;
    let current;

    const brightness_icon = Widget.Label({
        label: "󰌵",
        class_name: "quick-control icon",
    })    

    const brightness_value_label = Widget.Label({
        class_name: "circular-progress-slider font"
    }).on("realize",(self) => {
        self.visible = false;
    }).hook(brightness, (self) => {
        self.label = `${Math.round(brightness.screen_value * 100)}`;
    })

    const brightness_progress = Widget.CircularProgress({
        value: brightness.bind('screen-value'),
        class_name: 'quick-control circular-progress-slider',
        rounded: true,
        startAt: 0.25,
        child: brightness_value_label
    })

    const brightness_event_box = Widget.EventBox({
        child: brightness_progress,

        on_scroll_up: () => {
            brightness.screen_value += -0.015
        },
        on_scroll_down: () => {
            brightness.screen_value += 0.015
        },
        on_hover: () => {
            if (active) {
                return
            }
            brightness_progress.toggleClassName('hover', true)
            brightness_value_label.visible = true
        },
        on_hover_lost: () => {
            brightness_progress.toggleClassName('hover', false)
            brightness_value_label.visible = false
        }
    })

    brightness_event_box.connect('button-press-event', () => {
        active = true
        brightness_progress.toggleClassName('hover', false)
        brightness_value_label.visible = false
    })

    brightness_event_box.connect('button-release-event', () => {
        active = false
    })

    brightness_event_box.connect('motion-notify-event', (self, event) => {
        let [_,x,y] = event.get_coords();
        if (!active) {
            return
        }
        if (current != x && current < x) {
           brightness.screen_value += 0.02
        }
        if (current != x && current > x) {
           brightness.screen_value -= 0.02
        }
        current = x;
    })

    const brightness_container = Widget.Box({
        spacing: 6,
        children: [
            brightness_icon,
            brightness_event_box
        ]
    })

    return brightness_container
}
