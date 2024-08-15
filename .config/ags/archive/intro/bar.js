import { date, battery } from './vars.js'

const batteryProgress = Widget.CircularProgress({
    value: battery.bind('percent').as(p => p / 100),
    child: Widget.Icon({
        icon: battery.bind('icon_name')
    })
})

const dateLabel = Widget.Label({
    label: date.bind()
})

const percent = Variable(0.5)
const { speaker } = await Service.import("audio")
const slider = Widget.Slider({
    value: speaker.bind("volume"),
    onChange: ({ value }) => speaker.value = value
})

export function Bar(monitor) {

    return Widget.Window({
        monitor,
        name: 'bar',
        anchor: ['top', 'left', 'right'],
        child: slider
    })
}
