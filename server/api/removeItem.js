import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Parse the request to get the 'id' parameter
    const { id } = await readBody(event);
    
    if (!id) {
      return { success: false, error: 'ID is required', removedItem: null };
    }

    // Construct the path to the items.json file
    const filePath = join(process.cwd(), 'server', 'data', 'items.json');

    // Read the contents of the JSON file
    const data = await readFile(filePath, 'utf-8');
    const parsedData = JSON.parse(data);

    // Check if actions exist in the parsedData
    if (!Array.isArray(parsedData.actions)) {
      return { success: false, error: 'Invalid data structure in items.json', removedItem: null };
    }

    // Find the index of the item to remove
    const index = parsedData.actions.findIndex(item => item.id === id);

    if (index === -1) {
      return { success: false, error: 'Item not found', removedItem: null };
    }

    // Remove the item
    const removedItem = parsedData.actions.splice(index, 1)[0];

    // Write the updated data back to the file
    await writeFile(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');

    // Return the success response with the removed item
    return { success: true, error: null, removedItem };
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error removing item:', error);
    return { success: false, error: 'Unable to remove item', removedItem: null };
  }
});
