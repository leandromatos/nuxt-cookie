<template>
  <div>
    {{ cookie }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      cookie: null,
    }
  },

  mounted() {
    this.$cookie.set('client', 'client-cookie-value', { path: '/' })
    this.cookie = this.$cookie.get('client')
  },
}
</script>
