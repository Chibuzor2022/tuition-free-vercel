// migrate-simple.js
import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from 'mongodb';
import { createClient } from "@sanity/client";

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB || 'test';
const collectionName = process.env.MONGO_COLLECTION || 'scholarships';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-01-01',
});

function slugify(s) {
  if (!s) return '';
  return s.toString().toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function toPortableText(text) {
  if (!text) return [];
  return [{
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', text: String(text) }],
  }];
}

function formatDate(d) {
  if (!d) return undefined;
  const dt = new Date(d);
  if (isNaN(dt)) return undefined;
  return dt.toISOString().slice(0, 10); // YYYY-MM-DD
}

async function run() {
  const mongo = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  await mongo.connect();
  const db = mongo.db(dbName);
  const col = db.collection(collectionName);

  const docs = await col.find({}).toArray();
  console.log(`Fetched ${docs.length} docs from MongoDB.`);

  for (const doc of docs) {
    const name = doc.name || doc.title || 'Untitled Scholarship';
    const baseSlug = slugify(name) || String(doc._id);
    const sanityId = `scholarship-${String(doc._id)}`; // stable id

    const sanityDoc = {
      _id: sanityId,
      _type: 'scholarship',
      name,
      slug: { _type: 'slug', current: baseSlug },
      description: Array.isArray(doc.description) ? doc.description : toPortableText(doc.description || doc.summary || doc.details),
      country: doc.country || '',
      deadline: formatDate(doc.deadline || doc.applicationDeadline),
      eligibility: doc.eligibility || '',
      funding: Array.isArray(doc.funding) ? doc.funding : (doc.funding ? [String(doc.funding)] : []),
      level: doc.level || '',
      link: doc.link || doc.applyLink || doc.url || '',
      // imageUrl: doc.imageUrl || doc.logo || '',
      image: doc.image || doc.logo || '',
    };

    await client.createOrReplace(sanityDoc);
    console.log('Upserted:', sanityDoc._id);
  }

  await mongo.close();
  console.log('Migration complete.');
}

run().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
