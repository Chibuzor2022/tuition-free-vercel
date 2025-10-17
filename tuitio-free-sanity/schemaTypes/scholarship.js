// sanity/schemaTypes/scholarship.js
export default {
  name: 'scholarship',
  title: 'Scholarship',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
    { name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }] },
    { name: 'country', title: 'Country', type: 'string' },
    { name: 'deadline', title: 'Deadline', type: 'string' },
    {name: "datePosted",  title: "Date Posted",  type: "datetime"},
    { name: 'eligibility', title: 'Eligibility', type: 'text' },
    { name: 'funding', title: 'Funding', type: 'array', of: [{ type: 'string' }] },
    { name: 'level', title: 'Level', type: 'string' },
    { name: 'link', title: 'Apply Link', type: 'url' },
    {
      name: 'image',
      title: 'Scholarship Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
};
