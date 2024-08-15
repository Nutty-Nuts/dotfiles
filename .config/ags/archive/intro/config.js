import { Bar } from "./bar.js"
// services
// const battery = await Service.import('battery')


// const batteryProgress = Widget.CircularProgress({
//     value: battery.bind('percent').as(p => p / 100),
//     child: Widget.Icon({
//         icon: battery.bind('icon_name')
//     })
// })


// // widgets
// function Bar(monitor) {
//     return Widget.Window({
//         monitor, 
//         name: 'bar',
//         anchor: ['top', 'left', 'right'],
//         child: batteryProgress
//     })
// }

App.config({
    windows: [
        // window definitions 
        Bar(0)
    ]
})
