<template>
  <section class="flex flex-col w-full">
    <div class="w-full grid grid-cols-5 gap-4 text-white mb-4" @click="showFilters">
      <div class="col-span-1 flex items-center">filtres</div>
      <div :class="['col-span-2 flex items-center justify-center p-2 rounded-lg cursor-pointer text-center text-dark border', filter === 'couches' || filter === 'both' ? 'bg-pink border-pink' : 'border-white text-white']" @click="updateFilter('couches')"><span>couches</span></div>
      <div :class="['col-span-2 flex items-center justify-center p-2 rounded-lg cursor-pointer text-center text-dark border', filter === 'repas' || filter === 'both' ? 'bg-pink border-pink' : 'border-white text-white']" @click="updateFilter('repas')">repas</div>
    </div>
    <div v-for="action in actions">
      <div 
        
        v-if="filter === 'both' || filter === action.type"
        :class="[action.type === 'couches' ? 'bg-sand':'', 
                  action.type === 'repas' ? 'bg-blue' : '',
                  'p-2 rounded-lg mb-2 flex flex-col'
                ]">
  
                <!--div class="self-center">{{ action.type }}</div-->
                <div class="w-full grid grid-cols-6 gap-4">
                  <div class="col-span-2 flex flex-col">
                    <div class="font-bold">à {{ getHour(action.heure) }}</div>
                    <div>le {{ getDate(action.heure) }}</div>
                  </div>
                  <div class="col-span-3 flex items-center font-bold">{{ action.commentaire }}</div>
                  <div class="col-span-1 flex items-center" @click="remove(action.id)">
                    <div class="flex items-center justify-center rounded-full bg-red text-center w-8 h-8">
                      X
                    </div>
                  </div>
                </div>
        
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { useActionStore } from '~/stores/action';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';



const items = useActionStore()
dayjs.locale('fr');

// Reactive reference to hold actions
const {actions: actions} = storeToRefs(items);
const filter = ref<string>('both')
const displayFilters = ref<boolean>(false)
const showFilters = () => {
  displayFilters.value = !displayFilters.value
}

const updateFilter = (type: string) => {
  console.log('test')
  if(filter.value === 'both' && type === 'couches') {
    console.log(1)
    filter.value = 'repas'
  } else if(filter.value === 'both' && type === 'repas') {
    console.log(2)
    filter.value = 'couches'
  } else if(filter.value === 'repas' && type === 'couches') {
    console.log(3)

    filter.value = 'both'
  } else if(filter.value === 'couches' && type === 'repas') {
    console.log(4)

    filter.value = 'both'
  } else if(filter.value === 'none') {
    console.log(4)

    filter.value = type
  }else {
    filter.value = 'none'
  }
  console.log(filter.value)
}

// Fetch actions from the server-side file
const fetchActions = async () => {
  items.getActions()
};

const remove = (id: Number) => {
  items.removeAction(id)
}

const formatHeure = (heure: string): string => {
  return heure.replace('T', ' ');
};

const getDate = (date: string) : string => {
  const formatteddate = date.split('T')[0].split('-')
  const day = formatteddate[2]
  const month = formatteddate[1]
  return day + '-' + month
 
}

const getHour = (date: string) : string => {
  return date.split('T')[1]
}

// Fetch the actions when the component is mounted
onMounted(() => {
  fetchActions();
});
</script>