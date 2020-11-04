<template>
  <div />
</template>

<script>
export default {
  created() {
    this.$cookie.set('server', 'server-cookie-value', { path: '/' })
  },
}
</script>
