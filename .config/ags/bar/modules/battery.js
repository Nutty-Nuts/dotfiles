const battery = await Service.import("battery")

// initial lines: 58
// updated lines: 55

function set_battery_state(widget, battery_state) {
    let battery_states = {
        "charging": false,
        "good": false,
        "warning": false,
        "critical": false,
    }
    battery_states[battery_state] = true

    widget.toggleClassName('charging', battery_states['charging'])
    widget.toggleClassName('good', battery_states['good'])
    widget.toggleClassName('warning', battery_states['warning'])
    widget.toggleClassName('critical', battery_states['critical'])
}

export function Battery() {
    const battery_icon = Widget.Label({
        class_name: 'battery-font circular-progress-status font',
        label: '󰁹'
    }).hook(battery, (self) => {
        let percent = battery.percent
        let charging = battery.charging

        if (charging) {
            self.label = '󱐋'
            return
        }
        if (percent <= 25) {
            self.label = '󰁼'
            return } 
        if (percent <= 50) {
            self.label = '󰁾'
            return
        }
        self.label = '󰁹'
    })

    const battery_label = Widget.Label({
        class_name: 'battery-font circular-progress-status font',
    }).on('realize', (self) => {
        self.visible = false
    }).hook(battery, (self) => {
        self.label = `${Math.round(battery.percent)}`
    })

    const battery_info_box = Widget.Box({
        children: [
            battery_icon,
            battery_label
        ],
        homogeneous: true,
    })

    const battery_circular = Widget.CircularProgress({
        class_name: 'circular-progress-status',
        value: battery.bind("percent").as(p => p > 0 ? p / 100 : 0),
        rounded: true,
        startAt: 0.25,
        child: battery_info_box
    }).hook(battery, (self) => {
        let charging = battery.charging
        let percent = battery.percent

        if (charging) {
            set_battery_state(self, 'charging')
            return
        }
        if (percent <= 25) {
            set_battery_state(self, 'critical')
            return
        } 
        if (percent <= 50) {
            set_battery_state(self, 'warning')
            return
        }
        set_battery_state(self, 'good')
    })

    const battery_event_box = Widget.EventBox({
        child: battery_circular,

        on_hover: () => {
            battery_icon.visible = false
            battery_label.visible = true
        },
        on_hover_lost: () => {
            battery_icon.visible = true
            battery_label.visible = false
        }
    }).hook(battery, (self) => {
        let time_remaining = battery['time_remaining']
        let seconds = time_remaining % 60
        let minutes = (time_remaining - seconds) / 60 % 60
        let hours = Math.floor((time_remaining - (minutes * 60)) / 60 / 60)
        let message = ''

        // console.log(time_remaining, 'time_remaining', seconds, minutes, hours)
        if (battery.charging) {
            message = 'Until Fully Charged'
        }
        else {
            message = 'Remaining'
        }

        self.tooltip_text = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${message}`
    })

    return battery_event_box
}
