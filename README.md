# 🍪 Nuxt Cookie

<!-- [![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Github Actions CI][github-actions-ci-src]][github-actions-ci-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href] -->

> The Cookie Module for [Nuxt](https://nuxtjs.org/), works perfectly on the client side and on the server side for set, get and remove cookies.

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

Add `@leandromatos/nuxt-cookie` dependency to your project.

```bash
yarn add @leandromatos/nuxt-cookie
```

or

```bash
npm install @leandromatos/nuxt-cookie
```

Add `@leandromatos/nuxt-cookie` to the `modules` section of `nuxt.config.js`.

```js
{
  modules: ['@leandromatos/nuxt-cookie']
}
```

## Usage

After add the module on your project, you can access it through the `$cookie`.

### Set a cookie

`$cookie.set(name, value, options)`

- `name` (string): Cookie name.
- `value` (string orobject|array|boolean): Cookie value.
- `options` (object): Same options as the [cookie.serialize](https://github.com/jshttp/cookie#cookieserializename-value-options) method of the [cookie module](https://github.com/jshttp/cookie).

Usage on server-side:

```js
// Nuxt middleware
export default ({ app: { $cookie } }) => {
  $cookie.set('cookie-name', 'server-cookie-value', {
    path: '/',
  })
})
```

Usage on client-side:

```js
// Vue component
export default {
  mounted() {
    this.$cookie.set('cookie-name', 'client-cookie-value', {
    path: '/',
  })
  }
}
```

### Get a cookie

`get(name)`

- `name` (string): Cookie name.

```js
// Nuxt middleware
export default ({ app: { $cookie } }) => {
  const cookie = $cookies.get('cookie-name')
}
```

```js
// Vue component
export default {
  mounted() {
    const cookie = this.$cookie.get('cookie-name')
  }
}
```

### Remove a cookie

`remove(name, options)`

- `name` (string): Cookie name.
- `options` (object): Same options as the [cookie.serialize](https://github.com/jshttp/cookie#cookieserializename-value-options) method of the cookie module

```js
// Nuxt middleware
export default ({ app: { $cookie } }) => {
  const cookie = $cookies.remove('cookie-name')
}
```

```js
// Vue component
export default {
  mounted() {
    const cookie = this.$cookie.remove('cookie-name')
  }
}
```

## Development

- Clone this repository
- Install dependencies using `yarn install` or `npm install`
- Start development server using `yarn run dev` or `npm run dev`

## License

[MIT License](./LICENSE)

Copyright (c) Leandro Matos <contato@leandromatos.com.br>

<!-- Badges -->

<!-- [npm-version-src]: https://img.shields.io/npm/v/@leandromatos/nuxt-cookie/latest.svg
[npm-version-href]: https://npmjs.com/package/@leandromatos/nuxt-cookie
[npm-downloads-src]: https://img.shields.io/npm/dt/@leandromatos/nuxt-cookie.svg
[npm-downloads-href]: https://npmjs.com/package/@leandromatos/nuxt-cookie
[github-actions-ci-src]: https://github.com/leandromatos/nuxt-cookie/workflows/ci/badge.svg
[github-actions-ci-href]: https://github.com/leandromatos/nuxt-cookie/actions?query=workflow%3Aci
[codecov-src]: https://img.shields.io/codecov/c/github/leandromatos/nuxt-cookie.svg
[codecov-href]: https://codecov.io/gh/leandromatos/nuxt-cookie
[license-src]: https://img.shields.io/npm/l/@leandromatos/nuxt-cookie.svg
[license-href]: https://npmjs.com/package/@leandromatos/nuxt-cookie -->
