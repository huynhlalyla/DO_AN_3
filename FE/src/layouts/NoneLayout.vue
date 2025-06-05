<template>
    <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'

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