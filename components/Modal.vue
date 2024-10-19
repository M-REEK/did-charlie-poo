<template>
    <section 
        :class="['h-[100%] w-[100%] flex items-center justify-center mb-4']">
        <div 
            v-if="modal.type === 'couche'"
            class="bg-sand flex flex-col items-center w-[80vw] rounded-lg p-2"
        >
            <h1 class="mb-4">Nouvelle couche</h1>
            <form
                @submit.prevent="createCouche"  
            >
            <!-- Heure -->
            <div class="input-field">
                <label for="heure" class="block  font-bold">Heure</label>
                <input
                id="heure"
                type="datetime-local"
                v-model="heure"
                class="border border-gray-300 rounded p-2 w-full"
                />
            </div>

            <!-- Pipi -->
            <div class="input-field">
                <label for="pipi" class="block  font-bold">Pipi</label>
                <input
                id="pipi"
                type="radio"
                v-model="selection"
                value="pipi"
                class="radio-button"
                />
            </div>

            <!-- Caca -->
            <div class="input-field">
                <label for="caca" class="block  font-bold">Caca</label>
                <input
                id="caca"
                type="radio"
                v-model="selection"
                value="caca"
                name="pipiCacaOptions"
                class="radio-button"
                />
            </div>

            <!-- Pipi Et Caca -->
            <div class="input-field">
                <label for="pipiEtCaca" class="block  font-bold">Pipi et Caca</label>
                <input
                id="pipiEtCaca"
                type="radio"
                v-model="selection"
                value="pipi et Caca"
                name="pipiCacaOptions"
                class="radio-button"
                />
            </div>
            <div class="w-full flex items-center justify-between">
                <button type="submit" class="bg-green text-white px-4 py-2 rounded hover:bg-darkBlue">
                    Ajouter
                </button>

                <div class="p-2 rounded-lg bg-red text-white" @click="cancel()">
                    Annuler
                </div>
            </div>
                
            </form>
        </div>
        <div v-else-if="modal.type === 'repas'" class="bg-blue  flex flex-col items-center w-[80vw] rounded-lg p-2">
            <h1 class="mb-4">Nouveau repas</h1>
            <form
                @submit.prevent="createRepas"  
            >
            <!-- Heure -->
            <div class="input-field">
                <label for="heure" class="block  font-bold">Heure</label>
                <input
                id="heure"
                type="datetime-local"
                v-model="heure"
                class="border border-gray-300 rounded p-2 w-full"
                />
            </div>

            <!-- Gauche -->
            <div class="input-field">
                <label for="gauche" class="block  font-bold">Gauche</label>
                <input
                id="gauche"
                type="radio"
                v-model="selection"
                value="gauche"
                name="gaucheDroiteOptions"
                class="radio-button"
                />
            </div>

            <!-- Droite -->
            <div class="input-field">
                <label for="droite" class="block  font-bold">Droite</label>
                <input
                id="droite"
                type="radio"
                v-model="selection"
                value="droite"
                name="gaucheDroiteOptions"
                class="radio-button"
                />
            </div>

            <!-- Droite Gauche -->
            <div class="input-field">
                <label for="droiteGauche" class="block  font-bold">Droite Gauche</label>
                <input
                id="droiteGauche"
                type="radio"
                v-model="selection"
                value="droite puis gauche"
                name="gaucheDroiteOptions"
                class="radio-button"
                />
            </div>

            <!-- Gauche Droite -->
            <div class="input-field">
                <label for="gaucheDroite" class="block  font-bold">Gauche Droite</label>
                <input
                id="gaucheDroite"
                type="radio"
                v-model="selection"
                value="gauche puis droite"
                name="gaucheDroiteOptions"
                class="radio-button"
                />
            </div>
                
            <div class="w-full flex items-center justify-between">
                <button type="submit" class="bg-green text-white px-4 py-2 rounded hover:bg-darkBlue">
                    Ajouter
                </button>

                <div class="p-2 rounded-lg bg-red text-white" @click="cancel()">
                    Annuler
                </div>
            </div>
            </form>
        </div>
        
    </section>
</template>

<script lang="ts" setup>
import { useModalStore } from '@/stores/modal';
import { useActionStore } from '~/stores/action';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
dayjs.locale('fr');
const modal = useModalStore()
const action = useActionStore()

// Form data for creating the new action
const actionType = ref<string>('')
const heure = ref<string>(dayjs().format('YYYY-MM-DDTHH:mm'))
const selection = ref<string>('')

const createCouche= async () => {
    actionType.value = 'couches'
    console.log('Creating new action with type:', actionType.value)

    // Define the new action object
    const newAction = {
        type: actionType.value,
        heure: heure.value,
        commentaire: selection.value,
        id: Math.random()
    };

    action.pushAction(newAction)
    resetForm()
    modal.closeModal()
}

const createRepas = async () => {
    actionType.value = 'repas'
    console.log('Creating new action with type:', actionType.value)

     // Define the new action object
     const newAction = {
        type: actionType.value,
        heure: heure.value,
        commentaire: selection.value,
        id: Math.random()
    };
    
    action.pushAction(newAction)
    resetForm()
    modal.closeModal()
}

const cancel = () => {
    resetForm()
    modal.closeModal()
}








// Function to reset form data after submission
const resetForm = () => {
  actionType.value = 'couche'
  heure.value = new Date().toISOString()
  selection.value=''
}


</script>

<style>
    .input-field{
        @apply flex items-center mb-4
    }

    .radio-button{
        @apply w-8 h-8
    }

    input{
        @apply ml-4
    }
</style>