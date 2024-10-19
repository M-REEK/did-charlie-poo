import { readFile } from 'fs/promises';
import { join } from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Construct the path to the items.json file
    const filePath = join(process.cwd(), 'server', 'data', 'items.json');

    // Read the contents of the JSON file
    const data = await readFile(filePath, 'utf-8');

    // Parse the data and return it
    return JSON.parse(data);
  } catch (error) {
    // Handle errors (e.g., if the file does not exist)
    console.error('Error reading items.json:', error);
    return { error: 'Unable to fetch items' };
  }
});