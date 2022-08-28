<template>
  <v-app>
    <the-header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
export default {
  name: 'main-layout',
  components: {
    TheHeader
  }
}
</script>
