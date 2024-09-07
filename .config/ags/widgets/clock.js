const time = Variable(" ", {
    poll: [500, 'date "+%H %M"'],
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

export function Clock(monitor = 0) {
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

    const time_hour = Widget.Label({ class_name: "clock-time-label", label: "  " });
    const time_sep = Widget.Label({ class_name: "clock-time-label", label: "." });
    const time_minute = Widget.Label({ class_name: "clock-time-label", label: "  " });

    const time_container = Widget.CenterBox({
        homogeneous: true,
        start_widget: Widget.Box({
            children: [time_hour],
            hpack: "end",
        }),
        center_widget: time_sep,
        end_widget: Widget.Box({
            children: [time_minute],
            hpack: "start",
        }),
    }).hook(time, (self) => {
        let timeData = time.value.split(" ");

        time_hour.label = timeData[0];
        time_minute.label = timeData[1];
    });

    const container = Widget.Box({
        class_name: "clock-container",
        vertical: true,
        children: [time_container, day_label],
    });

    const window = Widget.Window({
        monitor,
        class_name: "clock-window",
        name: `clock-widget-${monitor}`,
        anchor: ["top"],
        margins: [16, 0, 0, 0],
        layer: "bottom",
        visible: true,
        child: container,
    });

    return window;
}
