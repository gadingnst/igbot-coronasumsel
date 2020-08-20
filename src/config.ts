/* Setting things up. */
import Env from 'dotenv'
import Puppeteer from 'puppeteer'
import Chrome from 'chrome-aws-lambda'

Env.config()
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
 
const env = process.env

export const IG_PROXY = env.IG_PROXY
export const IG_USERNAME = env.IG_USERNAME
export const IG_PASSWORD = env.IG_PASSWORD
export const SECRET_CODE = env.SECRET_CODE
export const COOKIES_PATH = __dirname + '/cookies.json'

export const puppeteer = async () => {
  const executablePath = await Chrome.executablePath
  const puppeteer = Chrome.headless ? Chrome.puppeteer : Puppeteer
  return puppeteer.launch({
    executablePath,
    ignoreHTTPSErrors: true,
    headless: env.NODE_ENV !== 'development',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
}
