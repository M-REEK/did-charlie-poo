import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
    state: () => ({
        type: '',
        display: false
    }),
    actions: {
        displayCoucheModal() {
            this.type = 'couche'
            this.display = true
        },
        displayRepasModal() {
            this.type = 'repas'
            this.display = true
        },
        closeModal() {
            this.type = ''
            this.display = false
        }
    }
})