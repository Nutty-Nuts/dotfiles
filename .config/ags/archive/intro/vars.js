export const battery = await Service.import('battery')

export const date = Variable('', {
    poll: [1000, 'date']
})
