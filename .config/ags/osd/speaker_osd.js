import GLib from 'gi://GLib'
const audio = await Service.import('audio')

let transition_interval;
let slider_value = Variable(0.5);

const SpeakerVolumeSlider = Widget.Slider({
    class_name: 'speaker-osd-slider unset',
    hexpand: true,
    draw_value: false,
    // value: audio['speaker'].bind('volume'),
    value: slider_value.bind(),
    on_change: ({ value }) => audio['speaker'].volume = value,
}).hook(audio, (self) => {
    let volume = audio['speaker'].volume 
    let gap = Math.abs(slider_value.value - volume)
    console.log('gap', gap)

    if (transition_interval != null) {
        GLib.source_remove(transition_interval)
    }

    if (self.value < volume) {
        let transition_interval = Utils.interval(50, () => {
            self.value = Math.min(self.value + 0.01, volume) 

            if (self.value == volume) {
                GLib.source_remove(transition_interval)
            }
        })
    }
    if (self.value > volume) {
        let transition_interval = Utils.interval(50, () => {
            self.value = Math.max(self.value - 0.01, volume) 

            if (self.value == volume) {
                GLib.source_remove(transition_interval)
            }
        })
    }
})

const SpeakerIcon = Widget.Label({
    class_name: 'speaker-osd-icon',
    label: '󰖀'
})

const SpeakerOSD = Widget.Box({
    class_name: 'speaker-osd-container',
    children: [
        SpeakerIcon,
        SpeakerVolumeSlider
    ]
})

export const SpeakerOSDWindow = Widget.Window({
    class_name: 'speaker-osd-window',
    name: 'speakerosd',
    visible: false,
    layer: 'overlay',
    child: SpeakerOSD,
    anchor: ["bottom"],
    margins: [0, 0, 64, 0]
})

let hideTimeoutId;

var volume;
var init = false;

Utils.watch(
    () => audio.speaker.volume, [audio.speaker], // Pass audio.speaker as an array
    () => {
        if (!init) {
            volume = audio.speaker.volume
            init = true
        }
        else {
            if (volume != audio.speaker.volume) {
                volume = audio.speaker.volume
                SpeakerOSDWindow.visible = true;

                if (hideTimeoutId !== null) {
                    GLib.source_remove(hideTimeoutId);
                }
                // Hide the window after 2 seconds
                hideTimeoutId = Utils.timeout(2000, () => {
                    SpeakerOSDWindow.visible = false;
                });
            }
        }
      console.log(audio.speaker.volume)
      // Clear the previous timeout
    }
);
