// Define a type for Action
export type Action = {
    type: 'couches' | 'repas',
    heure: string,
    commentaire?: string,
    id: Number
  };