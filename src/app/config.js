import Map from '@content/lib/map'

export default key => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return Map.prop(key, { database: 'content' })
    case 'test':
      return Map.prop(key, { database: 'content_test' })
    default:
      return Map.prop(key, { database: 'content_dev' })
  }
}
