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
  @import '@/assets/sass/typography';
  @import '@/assets/sass/buttons';

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    background: $surface;
    font-family: $libre;
    font-size: 1.4rem;
    margin: 0;

    &.nav-open {
      left: 0;
      position: fixed;
      top: 0;
      width: 100vw;
    }
  }

  .container {
    margin: 0 auto;
    padding: 50px 16px;
    width: 100%;

    @media screen and (min-width: $bp-md) {
      min-width: 680px;
      padding: 100px 16px;
      width: calc(100vw - 720px);
    }
  }
</style>
