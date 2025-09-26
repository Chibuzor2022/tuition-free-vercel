// src/sanityClient.js
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: "mm12a4zr",   // find this in sanity.config.js
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-09-24",       // use today’s date or newer
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
