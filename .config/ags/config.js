import { Bar } from './bar/bar.js'
import { Launcher } from './launcher/launcher.js'
import { NotificationPopups } from './notification/notification.js'
import { MediaPlayer } from './media_player/media_player.js'
import { SpeakerOSDWindow } from './osd/speaker_osd.js'
import { ControlCenter } from './popups/control_center.js'

const scss = `${App.configDir}/style.scss`
const css = `${App.configDir}/style.css`

Utils.exec(`sassc ${scss} ${css}`)
App.resetCss()
App.applyCss(css)

Utils.monitorFile(
    // directory that contains the scss files
    `${App.configDir}/style.scss`,

    // reload function
    function() {
        // compile, reset, apply
        print('applying updated scss')
        Utils.exec(`sassc ${scss} ${css}`)
        App.resetCss()
        App.applyCss(css)
    },
)

App.config({
    iconTheme: "Colloid-Yellow-Gruvbox-Dark",
    style: css,
    windows: [
        Bar(),
        Launcher,
        MediaPlayer,
        NotificationPopups(),
        SpeakerOSDWindow,
        ControlCenter()
    ]
})
