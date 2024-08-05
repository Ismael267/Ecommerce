<script setup>
import { RouterLink, RouterView } from 'vue-router'

import Header from './components/Layouts/Header.vue'

import Footer from './components/Layouts/Footer.vue'


</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
main {
  margin: 5%;
}
</style>
