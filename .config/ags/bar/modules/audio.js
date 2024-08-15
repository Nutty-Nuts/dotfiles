import brightness from '../../services/brightness.js'

// initial lines: 146
// updated lines:

const audio = await Service.import('audio')

function Brightness() {
    const hover = Variable(false)
    const show_value = Utils.merge([brightness.bind('screen_value'), hover.bind()], (screen_value, hover) => {
        return `${hover ? Math.round(screen_value * 100) : ''}`
    })
    const classes = (prefix) => Utils.merge([hover.bind()], (hover) => {
        return `${prefix} ${hover ? 'hover' : ''}`
    })

    const indicator = Widget.Label({
        class_name: "quick-control icon",
        label: "󰌵"
    })    
    const value = Widget.CircularProgress({
        value: brightness.bind('screen-value'),
        class_name: classes('quick-control circular-progress-slider'),
        rounded: true,
        startAt: 0.75,
        child: Widget.EventBox({
            child: Widget.Label({
                class_name: classes("circular-progress-slider font"),
                label: show_value
            }),
            on_scroll_up: () => {
                brightness.screen_value += -0.015
            },
            on_scroll_down: () => {
                brightness.screen_value += 0.015
            },
            on_hover: () => {
                hover.value = true
            },
            on_hover_lost: () => {
                hover.value = false
            }
        }),
    })
    return Widget.Box({
        spacing: 6,
        children: [
            indicator,
            value
        ]
    })
}

function Volume(type) {
    const hover = Variable(false)
    const volume = Utils.merge(
        [audio[type].bind('volume'), audio[type].bind('is_muted'), hover.bind()],
        (volume, is_muted, hover) => {
            if (hover)
                return is_muted 
                    ? ''
                    : `${Math.round(volume * 100)}`
            if (!hover)
                return '' 
        }
    )
    const speaker_type = Utils.merge(
        [audio.bind('speakers')],
        (speakers) => {
            // console.log(audio.speaker)
            if (type === 'speaker') {
                return speakers.length > 1 
                    ? '󰋋'
                    : '󰖀'
            }
            if (type === 'microphone') {
                return '󰍬'
            }
        }
    )
    const hover_classes = (classes) => {
        return Utils.merge(
        [hover.bind(), audio[type].bind('is_muted')],
            (hover, is_muted) => {
                var out = `${classes}`
                hover ? out = `${out} hover` : out = `${out}`
                is_muted ? out = `${out} is_muted` : out = `${out}`

                return `quick-control ${out}`
            }
        )
    }

    const indicator = Widget.Label({
        class_name: hover_classes("icon"),
        label: speaker_type
    })

    const progress = Widget.CircularProgress({
        value: audio[type].bind('volume'),
        class_name: hover_classes("circular-progress-slider"),
        rounded: true,
        startAt: 0.75,
        tooltip_text: audio[type].bind('description'),
        child: Widget.EventBox({
            child: Widget.Label({
                class_name: hover_classes("circular-progress-slider font"),
                label: volume
            }),
            on_hover: () => hover.value = true,
            on_hover_lost: () => hover.value = false,
            on_scroll_down: () => {
                if(audio[type].volume < 0.995) {
                    audio[type].volume += 0.005
                }
            },
            on_scroll_up: () => {
                audio[type].volume += -0.005
            },
            on_primary_click: () =>  {
                audio[type].is_muted = !(audio[type].is_muted)
                print(audio[type].is_muted)
            }       
        })
    })

    return Widget.Box({
        spacing: 6,
        children: [
            indicator,
            progress
        ]
    })
}

function OutputVolume() {
    let active = false;
    let current;
    const speaker = audio.speaker;
    const volumeValue = Utils.merge([speaker.bind('volume')], (volume) => {
        return `${Math.round(volume * 100)}`
    })

    const volumeIcon = Widget.Label({
        class_name: 'quick-control icon',
    }).hook(speaker, (self) => {
        console.log(speaker)
        Utils.timeout(100, () => {
            if (speaker.stream.port.includes('headphones')) {
                console.log('[VOLUME ICON] headphones,', speaker.stream.port)
                self.label = '󰓃'
            }
            if (speaker.stream.port.includes('speaker')) {
                console.log('[VOLUME ICON] speaker,', speaker.stream.port)
                self.label = '󰖀'
            }
        })
    })

    const volumeValueLabel = Widget.Label({
        label: volumeValue,
        class_name: "circular-progress-slider font",
        visible: false,
    }).on("realize",(self) => {
        self.visible=false;
    }).hook(speaker, () => {
        if (speaker.is_muted) {
            volumeValueLabel.visible = false
        }
    })

    const volumeProgress = Widget.CircularProgress({
        value: speaker.bind('volume'),
        tooltip_text: speaker.bind('description'),
        class_name: 'quick-control circular-progress-slider',
        rounded: true,
        startAt: 0.75,
        child: volumeValueLabel
    }).hook(speaker, () => {
        volumeProgress.toggleClassName('is_muted', speaker.is_muted)
        volumeIcon.toggleClassName('is_muted', speaker.is_muted)
    })

    const volumeEventBox = Widget.EventBox({
        child: volumeProgress,

        on_hover: () => {
            if  (!active) {
                volumeProgress.toggleClassName('hover', true)
                if (!speaker.is_muted) volumeValueLabel.visible = true
            }
        },
        on_hover_lost: () => {
            volumeValueLabel.visible = false
            volumeProgress.toggleClassName('hover', false)
        },
        on_scroll_down: () => {
            speaker.volume = Math.min(speaker.volume + 0.005, 0.995)
        },
        on_scroll_up: () => {
            speaker.volume = Math.max(speaker.volume - 0.005, 0)
        },
        on_middle_click: () =>  {
            speaker.is_muted = !(speaker.is_muted)
            volumeValueLabel.visible = speaker.is_muted

            if (!speaker.is_muted) volumeValueLabel.visible = true
        }
    })

    volumeEventBox.connect('button-press-event', () => {
        active = true
        volumeProgress.toggleClassName('hover', false)
        volumeValueLabel.visible = false
    })

    volumeEventBox.connect('button-release-event', () => {
        active = false
    })

    volumeEventBox.connect('motion-notify-event', (self, event) => {
        let [_,x,y] = event.get_coords();
        if (active) {
            console.log(`previous: ${current}, current: ${x}`)
            if (current != x && current < x) {
               speaker.volume = Math.min(speaker.volume + 0.01, 0.995)
            }
            if (current != x && current > x) {
               speaker.volume = Math.max(speaker.volume - 0.01, 0)
            }
            current = x;
        }
    })

    return Widget.Box({
        spacing: 6,
        children: [
            volumeIcon,
            volumeEventBox,
        ]
    })
}



export function Audio() {
    return Widget.EventBox({
        child: Widget.Box({
            class_name: "quick-controls-container",
            spacing: 11,
            children: [
                OutputVolume(),
                Volume('microphone'),
                Brightness()
            ]
        })
    })
}
