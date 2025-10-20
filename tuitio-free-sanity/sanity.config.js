import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'


export default defineConfig({

  name: 'default',
  title: 'tuitio-free-Sanity',

  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,


 
  plugins: [structureTool(), visionTool()],

   schema: {
    types: schemaTypes,
  },

})



