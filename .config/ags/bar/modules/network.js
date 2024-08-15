const network = await Service.import('network')

const strength = network.wifi.bind('strength').as(p => p > 0 ? p / 100 : 0)
const ssid = network.wifi.bind('ssid').as(p => p)

function set_network_state(widget, battery_state) {
    let network_states = {
        "charging": false,
        "good": false,
        "warning": false,
        "critical": false,
    }
    network_states[battery_state] = true

    widget.toggleClassName('charging', network_states['charging'])
    widget.toggleClassName('good', network_states['good'])
    widget.toggleClassName('warning', network_states['warning'])
    widget.toggleClassName('critical', network_states['critical'])
}

export function Network() {
    const network_icon = Widget.Label({
        class_name: "circular-progress-status network font"
    }).hook(network, (self) => {
        let strength = network.wifi.strength

        if (strength <= 0.25) {
            self.label = '󰤟'
            return 
        }
        if (strength <= 0.50) {
            self.label = '󰤢'
            return 
        }
        if (strength <= 0.75) {
            self.label = '󰤥'
            return 
        }
        self.label = '󰤨'
    })
    const network_value_label = Widget.Label({
        class_name: 'circular-progress-status font'
    }).on('realize', (self) => {
        self.visible = false 
    }).hook(network, (self) =>{
        let strength = network.wifi.strength

        self.label = `${strength}`
    })

    const network_info_box = Widget.Box({
        children: [
            network_icon,
            network_value_label,
        ],
        homogeneous: true,
    })

    const network_circular = Widget.CircularProgress({
        class_name: 'circular-progress-status',
        tooltip_text: ssid,
        value: strength,
        rounded: true,
        startAt: 0.25,
        child: network_info_box,
    }).hook(network, (self) => {
        if (strength <= 0.33) {
            set_network_state(self, 'critical')
            return 
        }
        if (strength <= 0.66) {
            set_network_state(self, 'warning')
            return 
        }
        set_network_state(self, 'good')
    })


    const network_event_box = Widget.EventBox({
        child: network_circular,

        on_hover: () => {
            network_icon.visible = false
            network_value_label.visible = true
        },
        on_hover_lost: () => {
            network_icon.visible = true
            network_value_label.visible = false
        }
    })

    return network_event_box
}