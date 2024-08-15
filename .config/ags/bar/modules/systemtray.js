const systemTray = await Service.import('systemtray')

function SystemTrayItem(item) {
    const itemIcon = Widget.Icon({
        class_name: 'system-tray-icon'
    }).bind('icon', item, 'icon')

    return Widget.Button({
        class_name: 'system-tray-item resizeable',
        tooltipMarkup: item.bind('tooltip_markup'),
        child: itemIcon,

        on_primary_click: (_, event) => item.activate(event),
        on_secondary_click: (_, event) => item.openMenu(event),
    })
}

export function SystemTray() {
    const system_tray = Widget.Box({
        spacing: 6,
        class_name: 'system-tray',
        children: systemTray.bind('items').as(i => i.map(SystemTrayItem))
    }).hook(systemTray, (self) => {
        if (systemTray.items.length > 0) {
            self.visible = true
        } 
        else {
            self.visible = false
        }
    })

    return system_tray
}
