const hyprland = await Service.import('hyprland')

const focusedTitle = Widget.Label({
    label: hyprland.active.client.bind('title'),
    visible: hyprland.active.client.bind('address')
        .as(addr => !!addr),
})

const dispatch = ws => hyprland.messageAsync(`dispatch workspace ${ws}`);
const activeId = hyprland.active.workspace.bind("id")

export const Workspaces = () => Widget.EventBox({
    onScrollUp: () => {
        dispatch('+1')
        if (hyprland.active.workspace.id >= 10) {
            dispatch('1')
        }
    },
    onScrollDown: () => {
        dispatch('-1')
        if (hyprland.active.workspace.id <= 1) {
            dispatch('10')
        }
    },
    child: Widget.Box({
        class_name: "workspaces resizeable",
        children: Array.from({ length: 8 }, (_, id) => id + 1).map(id => Widget.Button({
            class_name: "workspace resizeable",
            setup: self => self.hook(hyprland, () => {
                  self.toggleClassName("focused", hyprland.active.workspace.id === id)
                  self.toggleClassName("occupied", (hyprland.getWorkspace(id)?.windows || 0) > 0)
            }),
            attribute: id,
            // label: `${id}`,
            onClicked: () => dispatch(id),
        })),

        // remove this setup hook if you want fixed number of buttons
        // setup: self => self.hook(hyprland, () => self.children.forEach(btn => {
        //     btn.visible = hyprland.workspaces.some(ws => ws.id === btn.attribute);
        // })),
    }),
})
