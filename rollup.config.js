import rootImport  from 'rollup-plugin-root-import'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs'
import buble       from 'rollup-plugin-buble'
import filesize    from 'rollup-plugin-filesize'
import css         from 'rollup-plugin-css-only'

module.exports = {
  entry      : 'src/index.js',
  dest       : 'demo/app.js',
  format     : 'umd',
  moduleId   : 'web-audio',
  plugins    : [
    rootImport({ extensions: ['.js', '/index.js'] }),
    css({ output: 'demo/app.css' }),
    nodeResolve({ jsnext: true, main: true, browser: true }),
    commonjs(),
    buble({ exclude : '**/*.css' }),
    filesize()
  ]
}
