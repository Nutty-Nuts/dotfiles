const mpris = await Service.import("mpris");

export function Playing() {
    const song_label = Widget.Label({
        class_name: "playing-song-label",
        label: " ",
    }).hook(mpris, (self) => {
        let player = mpris.getPlayer("spotify") || mpris.getPlayer("");
        let { track_title, track_artists } = player;

        self.label = track_title.toUpperCase();
    });

    const now_playing_label = Widget.Label({
        class_name: "playing-now-label",
        label: " ",
    }).hook(mpris, (self) => {
        let player = mpris.getPlayer("spotify") || mpris.getPlayer("");
        let { play_back_status } = player;

        if (play_back_status === "Playing") {
            self.label = " NOW PLAYING";
            return;
        }

        if (play_back_status === "Paused") {
            self.label = "󰏤 PAUSED";
            return;
        }

        if (play_back_status === "Stopped") {
            self.label = "󰓛 STOPPED";
            return;
        }
    });

    const container = Widget.Box({
        class_name: "clock-container",
        vertical: true,
        children: [song_label, now_playing_label],
    });

    const window = Widget.Window({
        class_name: "playing-window",
        name: "playing-widget",
        anchor: ["bottom"],
        margins: [0, 0, 32, 0],
        layer: "bottom",
        visible: true,
        child: container,
    });

    return window;
}
