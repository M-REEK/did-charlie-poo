import { defineStore } from 'pinia'
import type { Action } from '@/types/action'; // Import the type for actions
import dayjs from 'dayjs';

type RemoveItemResponse = {
  success: boolean;
  error: string | null;
  removedItem: any | null;
};

export const useActionStore = defineStore('items', {
    state: () => ({
        actions: [] as Action[]
    }),
    actions: {
        async getActions() {
            try {
                // Fetch data from the API endpoint you created
                const response = await $fetch('/api/getItems');
                if (response && !response.error) {
                  const items = this.trierTableauParDate(response.actions)
                  this.actions = items; // Assuming items.json has a structure like { "actions": [...] }
                } else {
                  console.error('Error fetching actions:', response.error);
                }
              } catch (error) {
                console.error('Error fetching actions:', error);
              }
        },

        async pushAction(newAction: any) {
            try {
                this.actions.unshift(newAction)
                this.actions = this.trierTableauParDate(this.actions)
                const response = await $fetch('/api/pushItems', {
                  method: 'POST',
                  body: newAction,
                })
            } catch(e) {
                console.error(e)
            }
        },

        async removeAction(id: Number) {
          try {
            // Specify the type of the response
            const response: RemoveItemResponse = await $fetch('/api/removeItem', {
              method: 'DELETE',
              body: { id },
            });
        
            // Check for success using the consistent response object
            if (response.success) {
              console.log('Removed item:', response.removedItem);
              
              // Remove the item from the local state
              const index = this.actions.findIndex(action => action.id === id);
              if (index !== -1) {
                this.actions.splice(index, 1);
              }
            } else {
              console.error('Error:', response.error);
            }
          } catch (error) {
            console.error('Error removing item:', error);
          }
    },
    trierTableauParDate(tableau: Action[]): Action[] {
      return tableau.sort((a, b) => {
        const dateA = dayjs(a.heure);
        const dateB = dayjs(b.heure);
    
        // Trier en ordre décroissant : la date la plus récente en premier
        if (dateA.isAfter(dateB)) {
          return -1;
        } else if (dateA.isBefore(dateB)) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
})