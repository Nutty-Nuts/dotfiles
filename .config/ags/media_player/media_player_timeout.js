import { MediaPlayer } from './media_player/media_player.js'
import GLib from 'gi://GLib'

var timeout;

export function startTimeout() {
    timeout = Utils.timeout(5000, () => {
        MediaPlayer.visible = false
        console.log('timeout')
    })
}

export function resetTimeout() {
    GLib.source_remove(timeout);
    startTimeout();
}
