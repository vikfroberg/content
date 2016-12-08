import { prop } from '@vikfroberg/func'

export default key => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prop(key, { database: 'content' })
    case 'test':
      return prop(key, { database: 'content_test' })
    default:
      return prop(key, { database: 'content_dev' })
  }
}
