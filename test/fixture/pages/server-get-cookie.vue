<template>
  <div>
    {{ cookie }}
  </div>
</template>

<script>
export default {
  created() {
    this.$cookie.set('server', 'server-cookie-value', { path: '/' })
    this.cookie = this.$cookie.get('server')
  },
}
</script>
