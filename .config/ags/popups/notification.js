// import Gtk from 'gi://Gtk'
// Gtk.Settings.get_default().gtk_enable_animations = false

const notifications = await Service.import("notifications");
notifications.popupTimeout = 5000;
notifications.forceTimeout = false;
notifications.clearDelay = 100;

/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
function NotificationIcon({ app_entry, app_icon, image }) {
    if (image) {
        return Widget.Box({
            css:
                `background-image: url("${image}");` + "background-size: contain;" + "background-repeat: no-repeat;" + "background-position: center;",
        });
    }

    let icon = "dialog-information";
    if (Utils.lookUpIcon(app_icon)) icon = app_icon;

    if (app_entry && Utils.lookUpIcon(app_entry)) icon = app_entry;

    return Widget.Box({
        child: Widget.Icon(icon),
    });
}

/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
function Notification(n) {
    const icon = Widget.Box({
        vpack: "start",
        class_name: "notify-icon",
        child: NotificationIcon(n),
    });

    const title = Widget.Label({
        class_name: "title",
        xalign: 0,
        justification: "left",
        hexpand: true,
        max_width_chars: 32,
        truncate: "end",
        wrap: true,
        label: n.summary.trim(),
        use_markup: true,
    });

    const body = Widget.Label({
        class_name: "body",
        hexpand: true,
        use_markup: true,
        xalign: 0,
        justification: "left",
        label: n.body.trim(),
        truncate: "end",
        wrap: true,
    });

    const actions = Widget.Box({
        class_name: "actions",
        homogeneous: true,
        children: n.actions.map(({ id, label }) =>
            Widget.Button({
                class_name: "action-button",
                on_clicked: () => {
                    n.invoke(id);
                    n.dismiss();
                },
                hexpand: true,
                child: Widget.Label(label),
            })
        ),
    });

    const box = Widget.Box(
        {
            class_name: `notification ${n.urgency}`,
            vertical: true,
        },
        Widget.Box([icon, Widget.Box({ vertical: true }, title, body)]),
        actions
    );

    const revealer = Widget.Revealer({
        revealChild: false,
        visible: true,
        transitionDuration: 250,
        transition: "crossfade",
        // pass_through: true,
        child: box,
        setup: (self) => {
            self.visible = true;
            Utils.timeout(100, () => {
                self.revealChild = true;
            });

            Utils.timeout(4500, () => {
                self.revealChild = false;
                Utils.timeout(250, () => {
                    self.visible = false;
                });
            });
        },
    });

    const event_box = Widget.EventBox({
        attribute: { id: n.id },
        // on_primary_click: n.dismiss,
        child: revealer,
        on_primary_click: (self) => {
            self.child.revealChild = false;
            Utils.timeout(250, () => {
                n.dismiss;
                self.child.visible = false;
            });
        },
    });

    return event_box;
}

export function NotificationPopups(monitor = 0) {
    console.log(notifications);
    const list = Widget.Box({
        vertical: true,
        // children: notifications.popups.map(Notification),
    });

    function onNotified(_, /** @type {number} */ id) {
        const n = notifications.getNotification(id);
        console.log(n);
        if (n)
            // list.children = [Notification(n), ...list.children]
            list.child = Notification(n);
    }

    function onDismissed(_, /** @type {number} */ id) {
        list.children.find((n) => n.attribute.id === id)?.destroy();
    }

    list.hook(notifications, onNotified, "notified").hook(notifications, onDismissed, "dismissed");

    return Widget.Window({
        monitor,
        name: `notifications`,
        class_name: "notification-popups",
        anchor: ["top"],
        child: Widget.Box({
            css: "min-width: 2px; min-height: 2px;",
            class_name: "notifications transparent shadow",
            vertical: true,
            child: list,
        }),
    });
}

export const NotificationPopupLayer = NotificationPopups();
