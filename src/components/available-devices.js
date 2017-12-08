import m from 'mithril'
import stream from 'mithril/stream'

const currentDevices = stream([])

const checkDevices = () => {
  navigator.mediaDevices.enumerateDevices()
    .then(currentDevices)
    .catch((error) => console.error(`${ error.name }: ${ error.message }`, error))
}

export default {

  oninit : ({ state }) => {
    navigator.mediaDevices.ondevicechange = checkDevices
    checkDevices()

    currentDevices.map((devices) => {
      if (devices.length) {
        state.physicalDevices = Object.values(
          devices
            .filter((io) => io.kind !== 'videoinput')
            .reduce((acc, io) => Object.assign(acc, {
              [io['groupId']] : (acc[io['groupId']] || []).concat(io)
            }), {})
        )
      } else {
        state.physicalDevices = []
      }
      m.redraw()
    })
  },

  onremove : () => {
    navigator.mediaDevices.ondevicechange = null
  },

  view : ({ state }) => [
    m('h4', 'Available devices'),
    m('.row', [
      m('.w50', [
        m('h5', 'Input'),
        state.physicalDevices.map((device, i) => [
          m('', [
            m('span.strong', `Device ${ i }:`),
            ` ${ device[i].groupId.substr(0, 16) }…`,
          ]),
          m('ul',
            device
              .filter((io) => io.kind === 'audioinput')
              .map((io) => m('li', `${ io.label } ${ io.deviceId.length > 16 ? io.deviceId.substr(0, 16) + '…' : io.deviceId }`))
          )
        ])
      ]),
      m('.w50', [
        m('h5', 'Output'),
        state.physicalDevices.map((device, i) => [
          m('', [
            m('span.strong', `Device ${ i }:`),
            ` ${ device[i].groupId.substr(0, 16) }…`,
          ]),
          m('ul',
            device
              .filter((io) => io.kind === 'audiooutput')
              .map((io) => m('li', `${ io.label } ${ io.deviceId.length > 16 ? io.deviceId.substr(0, 16) + '…' : io.deviceId }`))
          )
        ])
      ]),
    ]),
    m('.row', [
      m('p', 'Devices will have a human-readable label listed above if permissions to use audio devices has previously been granted.')
    ])
  ]
}
