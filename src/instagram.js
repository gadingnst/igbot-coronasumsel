const Fs = require('fs')
const { IgApiClient } = require('instagram-private-api')
const { instantScreenshot } = require('./helpers')
const { IG_PROXY, IG_USERNAME, IG_PASSWORD, COOKIES_PATH } = require('./config')

const setup = async (check = false) => {
  const ig = new IgApiClient()
  IG_PROXY && (ig.state.proxyUrl = IG_PROXY)
  IG_USERNAME && ig.state.generateDevice(IG_USERNAME)

  try {
    const flag = { cache: true }
    if (!check) throw flag
    console.info('> Checking Cookies...')
    if (Fs.existsSync(COOKIES_PATH)) {
      console.info('> Login Skipped, Cookies Exists!')
      throw flag
    }
    console.info('> Logging In...')
    await ig.simulate.preLoginFlow()
    await ig.account.login(IG_USERNAME, IG_PASSWORD)
    const cookies = await ig.state.serializeCookieJar()
    await Fs.promises.writeFile(COOKIES_PATH, JSON.stringify(cookies))
    console.info('> Login Cookies Stored!\n')
  } catch (error) {
    if (!error.cache) throw error
    const loginCookies = require(COOKIES_PATH)
    await ig.state.deserializeCookieJar(loginCookies)
  }

  return ig
}


const publishPost = async () => {
  console.info('> Preparing screenshot...')
  const { data: { date }, image: file, error } = await instantScreenshot('http://corona.sumselprov.go.id', () => {
    const target = document.querySelectorAll('#sppb-addon-wrapper-1584204545552')[1]
    const captWrapper = document.querySelectorAll('.sppb-addon.sppb-addon-text-block.sppb-text-center')[1]
    const header = document.querySelector('#sp-header')
    const date = captWrapper.innerText.split('\n')[1]
    header.style.display = 'none'
    target.scrollIntoView()
    return { date }
  })

  if (error) throw new Error(error)
  const caption = `Update corona sumsel per-${date}.\n.\n.\n#corona #coronapalembang #coronasumsel #coronasumselprov #covid19 #covidpalembang #covidsumsel #updatecovid #covidindonesia`
  console.info('> Screenshot Prepared.')

  const {
    latitude,
    longitude,
    searchQuery
  } = {
    latitude: -2.91673,
    longitude: 104.7458,
    searchQuery: 'Palembang, Indonesia',
  }

  console.info('> Publishing secrenshoot...')
  const instagram = await setup()
  const location = (await instagram.search.location(latitude, longitude, searchQuery))[0]
  const result = await instagram.publish.photo({ file, caption, location })
  console.info(`> Screenshot published at: ${new Date().toLocaleString()}.\n`)
  return result
}

module.exports = { setup, publishPost }