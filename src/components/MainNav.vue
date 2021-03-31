<template>
  <div class="main-nav" :class="{'main-nav--open' : navOpen}">
    <div class="main-nav__logo">
      <logo />
    </div>
    <nav class="main-nav__menu">
      <router-link @click="closeNav" to="/">Products</router-link>
      <router-link @click="closeNav" to="/">News</router-link>
      <router-link @click="closeNav" to="/">Contact</router-link>
      <router-link @click="closeNav" to="/cart">
        <cart-icon fill-color="black" />
      </router-link>
    </nav>
    <button class="main-nav__burger" @click="openNav">
      Menu
      <burger />
    </button>
    <div class="main-nav__overlay" @click="closeNav"></div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Logo from '@/components/svgs/Logo.vue'
import Burger from '@/components/svgs/Burger.vue'
import CartIcon from '@/components/svgs/CartIcon.vue'

export default {
  name: 'MainNav',
  components: {
    Logo,
    Burger,
    CartIcon
  },
  setup () {
    const navOpen = ref(false)
    const bodyEl = document.querySelector('body')

    const openNav = () => {
      navOpen.value = true
      bodyEl.classList.add('nav-open')
    }

    const closeNav = () => {
      navOpen.value = false
      bodyEl.classList.remove('nav-open')
    }
    return {
      navOpen,
      openNav,
      closeNav
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/sass/variables';

  .main-nav {
    background: $white;
    align-items: center;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    font-size: 1.2rem;
    height: 56px;
    justify-content: space-between;
    padding: 15px 20px;

    &__logo {
      svg {
        height: 14px;

        @media screen and (min-width: $bp-md) {
          height: 20px;
        }
      }
    }

    &__menu {
      background: $white;
      opacity: 0;
      padding: 20px 25px 20px 18px;
      pointer-events: none;
      position: absolute;
      right: 8px;
      top: 8px;
      transition: opacity 0.2s ease-in-out;
      z-index: 2;

      a {
        display: block;
        margin-bottom: 30px;
        text-decoration: none;
        text-transform: uppercase;

        &:last-child {
          margin-bottom: 0;
        }

        @media screen and (min-width: $bp-md) {
          border-radius: 3px;
          display: inline-block;
          margin: 0 6px;
          padding: 10px 15px;
          transition: background-color 0.2s ease-in-out;

           &:hover {
            background: $secondary;
          }
        }
      }

      @media screen and (min-width: $bp-md) {
        align-items: center;
        display: flex;
        opacity: 1;
        padding: 0;
        pointer-events: all;
        position: static;
      }
    }

    &__overlay {
      background: rgba(0,0,0,0.8);
      height: 100vh;
      left: 0;
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      transition: opacity 0.2s ease-in-out;
      width: 100vw;

      @media screen and (min-width: $bp-md) {
        display: none;
      }
    }

    &__burger {
      background: none;
      border: none;
      display: flex;
      outline: 0;
      text-transform: uppercase;

      svg {
        margin-left: 15px;
      }

      @media screen and (min-width: $bp-md) {
        display: none;
      }
    }

    &--open {
      .main-nav__menu,
      .main-nav__overlay {
        opacity: 1;
        pointer-events: all;
      }
    }

    @media screen and (min-width: $bp-md) {
      height: 112px;
      padding-left: 48px;
      padding-right: 30px;
    }
  }
</style>
