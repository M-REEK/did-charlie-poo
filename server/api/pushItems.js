import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  // The path to your JSON file
  const filePath = join(process.cwd(), 'server', 'data', 'items.json')

  // Extract the new action object from the request body
  const newAction = await readBody(event)

  try {
    // Read the existing data from the JSON file
    const data = await readFile(filePath, 'utf-8')
    const json = JSON.parse(data)

    // Ensure the data format is correct
    if (!json.actions) {
      json.actions = []
    }

    // Add the new action object to the actions array
    json.actions.unshift(newAction)

    // Write the updated data back to the JSON file
    await writeFile(filePath, JSON.stringify(json, null, 2))

    // Return a success response
    return {
      success: true,
      message: 'Action added successfully',
    }
  } catch (error) {
    console.error('Error updating JSON file:', error)
    // Return an error response if something goes wrong
    return {
      success: false,
      message: 'Failed to add action',
      error: error.message,
    }
  }
})
