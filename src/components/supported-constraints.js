import m from 'mithril'

const audioConstraints = ['deviceId', 'groupId', 'channelCount', 'echoCancellation', 'latency', 'sampleRate', 'sampleSize', 'volume']

export default {
  view: () => [
    m('h4', 'Supported constraints'),
    m('row', navigator.userAgent),
    m('ul',
      Object.keys(navigator.mediaDevices.getSupportedConstraints())
        .filter((constraint) => audioConstraints.indexOf(constraint) > -1)
        .map((constraint) => m('li', constraint))
    )
  ]
}
