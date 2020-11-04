const { resolve } = require('path')

module.exports = async function (moduleOptions) {
  this.addPlugin({
    fileName: 'leandromatos-nuxt-cookie-plugin.js',
    src: resolve(__dirname, 'plugin.js'),
  })
}

module.exports.meta = require('../package.json')
