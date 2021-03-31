<template>
  <main-nav></main-nav>
  <router-view />
</template>

<script>
import MainNav from '@/components/MainNav.vue'

export default {
  name: 'App',
  components: {
    MainNav
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss">
  @import '@/assets/sass/variables';

  html {
    font-size: 62.5%;
  }

  body {
    background: $surface;
    font-family: $libre;
    font-size: 1.6rem;
    margin: 0;

    &.nav-open {
      left: 0;
      position: fixed;
      top: 0;
      width: 100vw;
    }
  }
</style>
