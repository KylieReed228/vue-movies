<template>
  <router-link :to="{ name: 'main' }" class="logo">
    <img class="logo__img" src="../assets/images/logo.png" alt="">
    <span>Movies</span>
  </router-link>
</template>
<script>
export default {
  name: 'TheLogo'
}
</script>
<style lang="scss">
.logo {
    display: flex;
    align-items: center;
    font-size: 32px;
    text-decoration: none;
    &__img {
        width: 30px;
        margin-right: 10px;
    }
}
</style>
