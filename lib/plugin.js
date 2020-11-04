import Cookie from 'cookie'

class CookiePlugin {
  /**
   * Create a new plugin instance.
   *
   * @param {Object} object - Object with request object and response object
   * @param {Object} object.req - Request object
   * @param {Object} object.res - Response object
   */
  constructor({ req = {}, res = {} }) {
    this.req = req
    this.res = res
  }

  /**
   * Set cookie.
   *
   * @param {string} name Cookie name
   * @param {any} value Cookie value
   * @param {Object} options Cookie options - https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
   */
  set(name, value, options = { path: '/' }) {
    if (!name) return

    value = typeof value === 'object' ? JSON.stringify(value) : value

    if (process.server) this.setServerCookie(name, value, options)
    if (process.client) this.setClientCookie(name, value, options)
  }

  /**
   * Set cookie on the server side.
   *
   * @param {string} name Cookie name
   * @param {any} value Cookie value
   * @param {Object} options Cookie options - https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
   */
  setServerCookie(name, value, options) {
    let cookies = this.res.getHeader('Set-Cookie')
    cookies = typeof cookies === 'string' ? [cookies] : []

    const cookie = Cookie.serialize(name, value, options)

    cookies.push(cookie)

    this.res.setHeader('Set-Cookie', cookies)
  }

  /**
   * Set cookie on the client side.
   *
   * @param {string} name Cookie name
   * @param {any} value Cookie value
   * @param {Object} options Cookie options - https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
   */
  setClientCookie(name, value, options) {
    const cookie = Cookie.serialize(name, value, options)

    document.cookie = cookie
  }

  /**
   * Get cookie.
   *
   * @param {string} name Cookie name
   *
   * @returns Cookie value
   */
  get(name) {
    if (!name) return

    let cookie
    if (process.server) cookie = this.getServerCookie(name)
    if (process.client) cookie = this.getClientCookie(name)

    return cookie
  }

  /**
   * Get server-side cookie.
   *
   * @param {string} name Cookie name
   *
   * @returns Cookie value
   */
  getServerCookie(name) {
    const cookies = this.req.headers.cookie
    const parsedCookieValue = this.parseCookieValue(cookies, name)

    return parsedCookieValue
  }

  /**
   * Get client-side cookie.
   *
   * @param {string} name Cookie name
   *
   * @returns Cookie value
   */
  getClientCookie(name) {
    const cookies = document.cookie
    const parsedCookieValue = this.parseCookieValue(cookies, name)

    return parsedCookieValue
  }

  /**
   * Remove cookie.
   *
   * @param {string} name Cookie name
   * @param {Object} options Cookie options - https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
   */
  remove(name, options = { path: '/' }) {
    if (!name) return

    options.expires = new Date(0)

    if (typeof this.get(name) !== 'undefined') this.set(name, '', options)
  }

  /**
   * Parse cookie value.
   *
   * @param {string} cookies
   * @param {string} name
   *
   * @returns Parsed cookie value
   */
  parseCookieValue(cookies = '', name) {
    const parsedCookies = Cookie.parse(cookies)

    if (parsedCookies.hasOwnProperty(name)) {
      const parsedCookieValue = parsedCookies[name]

      try {
        return JSON.parse(parsedCookieValue)
      } catch (error) {
        return parsedCookieValue
      }
    }

    return ''
  }
}

export default async function CookieModule({ isHMR, req, res }, inject) {
  if (isHMR) return

  inject('cookie', new CookiePlugin({ req, res }))
}
