const audio = await Service.import('audio')

export function Volume() {
    const hover = Variable(false)
    const icon = Utils.merge (
        [audio['speaker'].bind("volume"), hover.bind()],
        (volume, hover) => {
            if (hover) {
                return `${Math.round(volume * 100)}`
            }
            if (!hover) {
                return '󰕿'
            }
        }
    )
    const classes = Utils.merge (
        [audio['speaker'].bind("volume")],
        (volume) => {
            print(volume)
            return volume >= 0.8 
                ? 'volume-danger' : volume >= 0.6
                ? 'volume-warn' : 'volume-safe'
        }
    )

    return Widget.CircularProgress({
        child: Widget.Button({
            css: "background: rgba(0,0,0,0)",
            class_name: classes,
            child: Widget.Label({
                class_name: 'volume-font',
                label: icon
            }),
            onHover: () => {
                hover.value = true
            },
            onHoverLost: () => {
                hover.value = false
            },
            onScrollUp: () => {
                if(audio['speaker'].volume < 0.995) {
                    audio['speaker'].volume += 0.005
                }
            },
            onScrollDown: () => {
                audio['speaker'].volume += -0.005
            }
        }),
        value: audio['speaker'].bind('volume'),
        class_name: classes,
        rounded: true,
        startAt: 0.75,
    })
}
