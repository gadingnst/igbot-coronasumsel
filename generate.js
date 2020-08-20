const { setup } = require('./src/instagram')

console.info('> Conecting to Instagram Account..')
setup(true).then(() => {
  console.info(`> Account connected.\n`)
})
