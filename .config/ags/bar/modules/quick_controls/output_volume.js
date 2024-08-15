const audio = await Service.import('audio')

export function OutputVolume() {
    let active = false;
    let previous_x;

    const speaker = audio.speaker;
    const volume_value = Utils.merge([speaker.bind('volume')], (volume) => {
        return `${Math.round(volume * 100)}`
    })

    const volume_icon = Widget.Label({
        class_name: 'quick-control icon',
        label: '󰖀'
    }).hook(speaker, (self) => {
        Utils.timeout(100, () => {
            if (speaker.stream.port.includes('headphones')) {
                self.label = '󰋎'
                return
            }
            if (speaker.stream.port.includes('speaker')) {
                self.label = '󰖀'
                return
            }
        })
    })

    const volume_value_label = Widget.Label({
        label: volume_value,
        class_name: "circular-progress-slider font",
        visible: false,
    }).on("realize",(self) => {
        self.visible = false;
    }).hook(speaker, () => {
        if (speaker.is_muted) volume_value_label.visible = false
    })

    const volume_progress = Widget.CircularProgress({
        value: speaker.bind('volume'),
        tooltip_text: speaker.bind('description'),
        class_name: 'quick-control circular-progress-slider',
        rounded: true,
        startAt: 0.25,
        child: volume_value_label
    }).hook(speaker, () => {
        volume_progress.toggleClassName('is_muted', speaker.is_muted)
        volume_icon.toggleClassName('is_muted', speaker.is_muted)
    })

    const volume_event_box = Widget.EventBox({
        child: volume_progress,

        on_hover: () => {
            if (active) {
                return
            }
            volume_progress.toggleClassName('hover', true)
            if (!speaker.is_muted) volume_value_label.visible = true
        },
        on_hover_lost: () => {
            volume_value_label.visible = false
            volume_progress.toggleClassName('hover', false)
        },
        on_scroll_down: () => {
            speaker.volume = Math.min(speaker.volume + 0.01, 0.995)
        },
        on_scroll_up: () => {
            speaker.volume = Math.max(speaker.volume - 0.01, 0)
        },
        on_middle_click: () =>  {
            speaker.is_muted = !(speaker.is_muted)
            volume_value_label.visible = speaker.is_muted

            if (!speaker.is_muted) volume_value_label.visible = true
        }
    })

    volume_event_box.connect('button-press-event', () => {
        active = true
        volume_progress.toggleClassName('hover', false)
        volume_value_label.visible = false
    })

    volume_event_box.connect('button-release-event', () => {
        active = false
    })

    volume_event_box.connect('motion-notify-event', (self, event) => {
        let [_,x,y] = event.get_coords();
        if (!active) {
            return
        }
        if (previous_x != x && previous_x < x) {
           speaker.volume = Math.min(speaker.volume + 0.01, 0.995)
        }
        if (previous_x != x && previous_x > x) {
           speaker.volume = speaker.volume - 0.01
        }
        previous_x = x;
    })

    return Widget.Box({
        spacing: 6,
        children: [
            volume_icon,
            volume_event_box,
        ]
    })
}

