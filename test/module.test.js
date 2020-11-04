import { setup, loadConfig, url } from '@nuxtjs/module-test-utils'
import got from 'got'
import { parse } from 'cookie'

describe('Server', () => {
  let nuxt

  beforeAll(async () => {
    ;({ nuxt } = await setup(loadConfig(__dirname)))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  it('should be able to set the cookie on the server side', async () => {
    const { headers } = await got(url('/server-set-cookie'))
    const serverCookies = headers['set-cookie']
    expect(serverCookies).toContain('server=server-cookie-value; Path=/')
  })

  it('should be able to get the cookie on the server side', async () => {
    const window = await nuxt.renderAndGetWindow(url('/server-get-cookie'))
    const layout = window.document.querySelector('#__layout').innerHTML
    expect(layout).toContain('server-cookie-value')
  })

  it('should be able to remove the cookie on the server side', async () => {
    const { headers } = await got(url('/server-remove-cookie'))

    // The cookie remains in the response header, but the browser will not show it, because the expiration date has been set to negative
    const serverCookies = headers['set-cookie']
    const serverCookiesParsed = serverCookies.map(serverCookie => parse(serverCookie))

    const expiredServerCookie = serverCookiesParsed.find(
      serverCookieParsed => serverCookieParsed.hasOwnProperty('server') && serverCookieParsed.hasOwnProperty('Expires')
    )

    const expiredServerCookieExpirationDate = Date.parse(expiredServerCookie['Expires'])
    const currentDate = new Date().getTime()

    expect(expiredServerCookieExpirationDate < currentDate).toBeTruthy()
  })
})

describe('Client', () => {
  let nuxt

  beforeAll(async () => {
    ;({ nuxt } = await setup(loadConfig(__dirname)))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  it('should be able to set the cookie on the client side', async () => {
    const window = await nuxt.renderAndGetWindow(url('/client-set-cookie'))
    const cookie = window.document.cookie

    expect(cookie).toContain('client-cookie-value')
  })

  it('should be able to get the cookie on the client side', async () => {
    const window = await nuxt.renderAndGetWindow(url('/client-get-cookie'))
    const layout = window.document.querySelector('#__layout').innerHTML

    expect(layout).toContain('client-cookie-value')
  })

  it('should be able to remove the cookie on the client side', async () => {
    const window = await nuxt.renderAndGetWindow(url('/client-remove-cookie'))
    const cookie = window.document.cookie || null

    expect(cookie).toBeNull()
  })
})
