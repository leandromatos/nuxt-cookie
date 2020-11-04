<template>
  <div />
</template>

<script>
export default {
  mounted() {
    this.$cookie.set('client', 'client-cookie-value', { path: '/' })
  },
}
</script>
