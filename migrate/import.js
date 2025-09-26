import fs from "fs";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mm12a4zr",   // e.g. "abcd1234"
  dataset: "production",          // or your dataset
  token: "skiSnN6cLrQNsZjEz5LmlVOG24jc50dIPZNdmhz9JwYGsFdgLzPW3oEnaPLZXmDNEnCYZffgJk8BzZvFJhRGUlt2szYxX62kXeyiqMvRgiXfQ3PkfLT4oB5D1kzelPZuuYfm5mlPlIFhPVWUt5Hlut13pvWaLAVNqnrJIIlFzu5FcvwcgeYs",     // the Developer token you created
  useCdn: false,                  // `false` for writes
  apiVersion: "2025-09-24",       // use today’s date
});



const data = JSON.parse(fs.readFileSync("transformed-scholarships.json", "utf8"));

async function importData() {
  for (const item of data) {
    await client.create(item);
    console.log(`✅ Uploaded: ${item._id || item.name}`);
  }
}

importData().catch((err) => {
  console.error("❌ Import failed:", err.message);
});
