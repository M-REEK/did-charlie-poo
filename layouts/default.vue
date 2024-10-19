<template>
    <Header />
    <section class="mt-20 p-2">
        <Modal v-if="modal.display === true" />
        <NuxtPage />
    </section>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal';

const modal = useModalStore()


</script>

<style>
body{
    @apply bg-dark text-dark
}
</style>