import m from 'mithril'
import 'imperavi-kube'
import './css/site.css'

import Corner from '/components/gh-corner'
import Devices from '/components/available-devices'
import Record from '/components/record-playback'
import Constraints from '/components/supported-constraints'

const wrapper = {
  view : ({ children }) => [
    Corner(),
    m('.content.inverted', [m('a[href=/]', { oncreate : m.route.link }, m('h1.title', 'audio labs'))].concat(children))
  ]
}

m.route(document.body, '', {
  '' : {
    view: () => m(wrapper, [
      m('ul.unstyled', [
        m('li', m('button.button.inverted.outline', { onclick: () => m.route.set('/available-devices') }, 'Available Devices')),
        m('li', m('button.button.inverted.outline', { onclick: () => m.route.set('/audio-record') }, 'Record and Playback')),
        m('li', m('button.button.inverted.outline', { onclick: () => m.route.set('/supported-constraints') }, 'List Supported Constraints')),
      ])
    ])
  },
  '/available-devices' : { view : () => m(wrapper, m(Devices)) },
  '/audio-record' : { view : () => m(wrapper, m(Record)) },
  '/supported-constraints' : { view : () => m(wrapper, m(Constraints)) },
})
