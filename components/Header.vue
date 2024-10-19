<template>
    <nav class="fixed top-0 left-0 flex items-center justify-center w-full h-16 border-b border-b-black">
      <ul class="grid grid-cols-2 gap-8">
        <li 
          class="col-span-1 cursor-pointer rounded-xl bg-sand text-dark p-2 uppercase w-[120px] text-center"
          @click="addCouche"
          >
            couche
        </li>
        <li 
          class="col-span-1 cursor-pointer  rounded-xl bg-blue text-dark p-2 uppercase w-[120px] text-center"
          @click="addRepas"
        >
            repas
        </li>
      </ul>
    </nav>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/stores/modal';

  const modal = useModalStore()
  const addCouche = () => {
    console.log('addCouche')
    modal.displayCoucheModal()
  }

  const addRepas = () => {
    console.log('addCouche')
    modal.displayRepasModal()
  }
</script>