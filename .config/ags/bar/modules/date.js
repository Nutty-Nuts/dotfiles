const time_date = Variable(
    {},
    {
        poll: [
            1000,
            'date "+%I %M %p %a %d"',
            (out) => {
                let object = {};
                let values = out.split(" ");
                let keys = ["hour", "minute", "meridiem", "day_of_the_week", "day"];

                for (let i = 0; i < 5; ++i) {
                    object[keys[i]] = values[i];
                }

                return object;
            },
        ],
    }
);

export function Date() {
    const meridiem = Widget.Label({
        class_name: "time-suffix",
    });
    const hour = Widget.Label({
        class_name: "hour",
    });
    const minute = Widget.Label({
        class_name: "minute",
    });

    const timeWidget = Widget.Box({
        class_name: "time-component",
        children: [meridiem, hour, minute],
    }).hook(time_date, () => {
        meridiem.label = time_date.value.meridiem;
        hour.label = time_date.value.hour;
        minute.label = `.${time_date.value.minute}`;
    });

    const day_of_the_week = Widget.Label({
        class_name: "day",
    });

    const day = Widget.Label({
        class_name: "date",
    });

    const suffix = Widget.Label({
        class_name: "date-suffix",
    });

    const dateWidget = Widget.Box({
        class_name: "date-component",
        spacing: 0,
        children: [day_of_the_week, day, suffix],
    }).hook(time_date, () => {
        day_of_the_week.label = time_date.value.day_of_the_week.toUpperCase().substring(0, 2);
        day.label = `.${time_date.value.day}`;

        let intDay = parseInt(time_date.value.day);

        if (intDay % 10 == 1 && intDay % 100 != 11) {
            suffix.label = "ST";
            return;
        }
        if (intDay % 10 == 2 && intDay % 100 != 12) {
            suffix.label = "ND";
            return;
        }
        if (intDay % 10 == 3 && intDay % 100 != 13) {
            suffix.label = "RD";
            return;
        }
        suffix.label = "TH";
    });

    return Widget.Box({
        spacing: 0,
        children: [timeWidget, dateWidget],
    });
}
