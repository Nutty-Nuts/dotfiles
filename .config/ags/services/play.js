const sfx_theme = "ocean";
const default_sfx_format = "oga";
const default_volume = 1;
const sfx = `${App.configDir}/assets/sfx/${sfx_theme}`;

export function play_sfx(sfx_name, volume = default_volume, audio_format = default_sfx_format) {
    console.log(`${sfx_name}.${audio_format}`);
    Utils.execAsync(`play -v ${volume} ${sfx}/${sfx_name}.${audio_format}`);
}
