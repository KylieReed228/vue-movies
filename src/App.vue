<template>
  <router-view />
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
body {
  min-width: 425px;
}
.theme--dark.v-application {
  background-color: #616161 !important;
}
.theme--light.v-application {
  background-color: #f5f5f5 !important;
}
</style>
