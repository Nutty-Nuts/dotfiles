const { query } = await Service.import("applications");
const WINDOW_NAME = "applauncher";

function AppItem(app) {
    const button = Widget.Button({
        class_name: "unset launcher-item",
        on_clicked: () => {
            App.closeWindow(WINDOW_NAME);
            app.launch();
        },
        attribute: { app },
        child: Widget.Box({
            spacing: 16,
            children: [
                Widget.Icon({
                    icon: app.icon_name || "",
                    size: 32,
                }),
                Widget.Label({
                    class_name: "title",
                    label: app.name,
                    xalign: 0,
                    vpack: "center",
                    truncate: "end",
                }),
            ],
        }),
    });

    button.connect("focus-in-event", () => {
        button.class_name = "unset launcher-item focused";
    });

    button.connect("focus-out-event", () => {
        button.class_name = "unset launcher-item";
    });

    return button;
}

const Applauncher = ({ width = 500, height = 500, spacing = 12 }) => {
    // list of application buttons
    let applications = query("").map(AppItem);

    // container holding the buttons
    const list = Widget.Box({
        vertical: true,
        children: applications,
        spacing,
    });

    // repopulate the box, so the most frequent apps are on top of the list
    function repopulate() {
        applications = query("").map(AppItem);
        list.children = applications;
    }

    // search entry
    const entry = Widget.Entry({
        hexpand: true,
        placeholder_text: "Search Application...",
        class_name: "unset launcher-entry",
        css: `margin-bottom: ${spacing}px;`,

        // to launch the first item on Enter
        on_accept: () => {
            // make sure we only consider visible (searched for) applications
            const results = applications.filter((item) => item.visible);
            if (results[0]) {
                App.toggleWindow(WINDOW_NAME);
                results[0].attribute.app.launch();
            }
        },

        // filter out the list
        on_change: ({ text }) =>
            applications.forEach((item) => {
                item.visible = item.attribute.app.match(text ?? "");
            }),
    });

    entry.connect("focus-in-event", () => {
        entry.class_name = "unset launcher-entry focused";
    });

    entry.connect("focus-out-event", () => {
        entry.class_name = "unset launcher-entry";
    });

    return Widget.Box({
        vertical: true,
        css: `margin: ${spacing * 2}px;`,
        children: [
            entry,

            // wrap the list in a scrollable
            Widget.Scrollable({
                class_name: "launcher-contents",
                hscroll: "never",
                css: `min-width: ${width}px;` + `min-height: ${height}px;`,
                child: list,
            }),
        ],
        setup: (self) =>
            self.hook(App, (_, windowName, visible) => {
                if (windowName !== WINDOW_NAME) return;

                // when the applauncher shows up
                if (visible) {
                    repopulate();
                    entry.text = "";
                    entry.grab_focus();
                }
            }),
    });
};

// there needs to be only one instance
export const Launcher = Widget.Window({
    name: WINDOW_NAME,
    class_name: "launcher-window",
    setup: (self) =>
        self.keybind("Escape", () => {
            App.closeWindow(WINDOW_NAME);
        }),
    visible: false,
    keymode: "exclusive",
    child: Widget.Box({
        class_name: "launcher-container transparent shadow",
        child: Applauncher({
            width: 350,
            height: 380,
            spacing: 12,
        }),
    }),
});
