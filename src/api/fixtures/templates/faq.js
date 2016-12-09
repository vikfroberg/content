export default {
  name: 'Faq',
  machine_name: 'faq',
  fields: [
    {
      name: 'Title',
      machine_name: 'title',
      type: 'text',
    },
    {
      name: 'Slug',
      machine_name: 'slug',
      type: 'text',
    },
    {
      name: 'Cards',
      machine_name: 'cards',
      type: 'collection',
      fields: [
        {
          name: 'Title',
          machine_name: 'title',
          type: 'text',
        },
        {
          name: 'Content',
          machine_name: 'content',
          type: 'text',
          rows: 5,
        }
      ],
    },
  ],
}
