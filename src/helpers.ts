import { Page } from 'puppeteer'
import DayJS from 'dayjs'
import { puppeteer } from './config'
import 'dayjs/locale/id'

type ImageType = 'jpeg'|'png'
type Screenshot<T> = {
  image?: Buffer
  error?: any
  data: T
}

export async function screenshot<T>(page: Page, cb: () => T, type: ImageType): Promise<Screenshot<T>> {
  const data = <T>(await page.evaluate(cb) || {})
  return { data, image: await page.screenshot({ type, path: 'test.jpeg' }) }
}

export async function instantScreenshot<T>(url: string, cb: () => T, type: ImageType = 'jpeg'): Promise<Screenshot<T>> {
  const browser = await puppeteer()
  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: 960,
      height: 800,
      deviceScaleFactor: 1
    })
    await page.goto(url, { waitUntil: 'load', timeout: 0 })
    const result = await screenshot(page, cb, type)
    return result
  } catch (error) {
    console.error(error)
    return { data: <T>{}, error }
  } finally {
    browser.close()
  }
}

export const dateFormat = (format: string = 'DD MMMM YYYY', date?: Date|string|number): string =>
  DayJS(date).locale('id').format(format)
