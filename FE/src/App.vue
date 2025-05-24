<template>
    <component :is="layout">
        <router-view></router-view>
    </component>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

//dùng route để xác định layout của trang
const route = useRoute()
const layout = computed(() => {
    return route.meta.layout || 'MainLayout'
})
</script>

<style lang="css" scoped>

</style>