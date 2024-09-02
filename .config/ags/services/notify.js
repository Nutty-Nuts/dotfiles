export function notify(icon, title, description) {
    Utils.execAsync(`notify-send -i '${icon}' '${title}' '${description}'`);
}
