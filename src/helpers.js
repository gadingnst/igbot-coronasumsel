const { puppeteer } = require('./config')

async function screenshot(page, cb, type) {
  const data = await page.evaluate(cb)
  return { data, image: await page.screenshot({ type }) }
}

async function instantScreenshot(url, cb, type = 'jpeg') {
  const browser = await puppeteer()
  try {
    const page = await browser.newPage()
    await page.setViewport({
      width: 960,
      height: 680,
      deviceScaleFactor: 1
    })
    await page.goto(url, { waitUntil: 'load', timeout: 0 })
    const result = await screenshot(page, cb, type)
    return result
  } catch (error) {
    console.error(error)
    return { data: {}, error }
  } finally {
    browser.close()
  }
}

module.exports = { screenshot, instantScreenshot }