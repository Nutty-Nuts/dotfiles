const battery = await Service.import("battery")
const sfx_theme = 'ocean'
const default_sfx_format = 'oga'
const sfx = `${App.configDir}/assets/sfx/${sfx_theme}`

let previous_charging_state;
let critical = false;

function notify(icon, title, description) {
    Utils.execAsync(`notify-send -i '${icon}' '${title}' '${description}'`)
}

function play_sfx(sfx_name, audio_format = default_sfx_format) {
    console.log(`${sfx_name}.${audio_format}`)
    Utils.execAsync(`play ${sfx}/${sfx_name}.${audio_format}`)
}

export function battery_events() {
    Utils.merge([battery.bind('charging'), battery.bind('percent')], (charging, percent) => {
        console.log('charging state changed')
        if (percent >= 0 && percent <= 25 && critical == false) {
            play_sfx('battery-low')
            notify('battery-low', 'Battery Critical', 'Battery is under 20%.')

            critical = true
        }
        if (percent > 25 && critical == true) {
            critical = false
        }

        if (previous_charging_state == charging) {
            return
        }
        if (previous_charging_state == false) {
            play_sfx('power-plug')
            notify('battery', 'Charger Connected', `Battery charging from ${percent}%`)
        }
        if (previous_charging_state == true) {
            play_sfx('power-unplug')
            notify('battery', 'Charger Disconnected', `Battery draining from ${percent}%`)
        }
        if (previous_charging_state == true && percent >= 80) { 
            play_sfx('battery-full')
            notify('battery', 'Charging Suspended', `Charging suspended at ${percent}%`)
        }
        previous_charging_state = charging
    })
}


