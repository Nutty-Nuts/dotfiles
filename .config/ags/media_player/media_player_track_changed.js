const mpris = await Service.import("mpris")
const players = mpris.bind("players")

const spotify = ({players}.players.emitter.players[0])

console.log('track monitor')
Utils.watch(() => spotify.track_title, () => {
    console.log('track changed')
})
