<template>
    <Toasts />
    <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import Toasts from '../components/Toasts.vue'

onMounted(() => {
  //set theme
  const theme = localStorage.getItem('theme') || 'light'
  if (theme === 'dark') {
      document.documentElement.classList.add('dark');
  } else {
      document.documentElement.classList.remove('dark');
  }

})
</script>

<style lang="scss" scoped>

</style>