import Fs from 'fs'
import { IgApiClient } from 'instagram-private-api'
import { instantScreenshot, dateFormat } from './helpers'
import { IG_PROXY, IG_USERNAME, IG_PASSWORD, COOKIES_PATH } from './config'

export const setup = async (check = false) => {
  const ig = new IgApiClient()
  IG_PROXY && (ig.state.proxyUrl = IG_PROXY)
  IG_USERNAME && ig.state.generateDevice(IG_USERNAME)

  try {
    const flag = { cache: true }
    if (!check) throw flag
    console.info('> Checking Cookies...')
    if (Fs.existsSync(COOKIES_PATH)) {
      console.info('> Login Skipped, Cookies Exists! If you want to re-login, try to remove `cookies.json`.')
      throw flag
    }
    console.info('> Logging In...')
    await ig.simulate.preLoginFlow()
    await ig.account.login(IG_USERNAME as string, IG_PASSWORD as string)
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


export const publishPost = async () => {
  console.info('> Preparing screenshot...')
  const { data: { date }, image, error } = await instantScreenshot('http://corona.sumselprov.go.id', () => {
    const target = document.querySelectorAll('.page-content')[1]
    const captWrapper: any = document.querySelectorAll('.sppb-addon.sppb-addon-text-block.sppb-text-center')[1]
    const header: any = document.querySelector('#sp-header')
    const date: string = captWrapper.innerText.split('\n')[1]
    header.style.display = 'none'
    target.scrollIntoView()
    return { date }
  })

  if (error) throw new Error(error)
  const file = image as Buffer
  const nowDate = dateFormat('dddd, DD MMMM YYYY')
  const nowTime = dateFormat('HH:mm')
  const caption = `Data corona provinsi Sumatera Selatan per-${date}. Diupdate pada: ${nowDate} Jam ${nowTime}.\n.\n.\n${getRandomTags()}`
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

const getRandomTags = (amount: number = 8) => {
  let tags = ''
  const possibleTags = [
    'corona', 'coronapalembang', 'coronasumsel',
    'coronasumselprov', 'covid19', 'covidpalembang',
    'covidsumsel', 'updatecovid', 'covidindonesia',
    'coronaindonesia', 'coronaprovinsi', 'indonesia',
    'palembang', 'sumsel', 'semateraselatan',
    'viruscorona', 'laporancorona', 'sumsel',
    'palembanginfo', 'kemenkes', 'kesehatan',
    'kemenkes_ri', 'coronavirus', 'covid',
    'ncov19', 'psbb', 'newnormal',
  ]

  for (let i = 0; i < amount; i++) {
    tags += `#${possibleTags[
      ~~(Math.random() * possibleTags.length)
    ]} `
  }
  
  return tags
}
