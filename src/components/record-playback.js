import m from 'mithril'
import stream from 'mithril/stream'


const recording = {

  // init | available | recording
  state : stream('init'),

  samples : [],

  error : null,

  open : () => {
    navigator.getUserMedia({ audio : true })
      .then((stream) => {
        recording.stream = stream
        recording.state('available')
      })
      .catch((err) => {
        recording.error = err
      })
  },

  toggle : () => {

  }
}
recording.state.map(m.redraw)

export default {

  view: () => [
    m('h4', 'Record and playback'),
    recording.error && m('.message.error', recording.error),
    m('button.button.outline', 'Open microphone'),
    true && m('button.button', { onclick : recording.toggle }, recording ? 'Stop' : 'Record'),
    recording.samples.map((sample) => m('button.inverse', { onclick : () => recording.play() }, sample.name))
  ]
}
