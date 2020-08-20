/* Setting things up. */
const Env = require('dotenv')
const Puppeteer = require('puppeteer')

Env.config()

const env = process.env
exports.IG_PROXY = env.IG_PROXY
exports.IG_USERNAME = env.IG_USERNAME
exports.IG_PASSWORD = env.IG_PASSWORD
exports.SECRET_CODE = env.SECRET_CODE
exports.COOKIES_PATH = __dirname + '/cookies.json'

exports.puppeteer = () => Puppeteer.launch({
  ignoreHTTPSErrors: true,
  headless: env.NODE_ENV !== 'development',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
})
