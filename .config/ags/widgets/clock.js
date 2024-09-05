const time = Variable(" ", {
    poll: [500, 'date "+%H.%M"'],
});

const day = Variable(" ", {
    poll: [
        1000,
        'date "+%A"',
        (out) => {
            return out.toUpperCase();
        },
    ],
});

export function Clock() {
    const time_label = Widget.Label({
        class_name: "clock-time-label",
        justification: "center",
        label: " ",
    }).hook(time, (self) => {
        self.label = time.value;
    });

    const day_label = Widget.Label({
        class_name: "clock-day-label",
        justification: "center",
        label: " ",
    }).hook(day, (self) => {
        self.label = day.value;
    });

    const container = Widget.Box({
        class_name: "clock-container",
        vertical: true,
        children: [time_label, day_label],
    });

    const window = Widget.Window({
        class_name: "clock-window",
        name: "clock-widget",
        anchor: ["top"],
        margins: [16, 0, 0, 0],
        layer: "bottom",
        visible: true,
        child: container,
    });

    return window;
}
