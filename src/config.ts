/* Setting things up. */
import Env from 'dotenv'
import Chrome from 'chrome-aws-lambda'

Env.config()

const env = process.env

export const IG_PROXY = env.IG_PROXY
export const IG_USERNAME = env.IG_USERNAME
export const IG_PASSWORD = env.IG_PASSWORD
export const SECRET_CODE = env.SECRET_CODE
export const COOKIES_PATH = __dirname + '/cookies.json'

export const puppeteer = async () => {
  const executablePath = await Chrome.executablePath
  return Chrome.puppeteer.launch({
    executablePath,
    args: Chrome.args,
    headless: Chrome.headless,
    ignoreHTTPSErrors: true
  })
}
