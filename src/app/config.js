import { prop } from 'ramda'

export default key => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prop(key, { db: 'content' })
    case 'test':
      return prop(key, { db: 'content_test' })
    default:
      return prop(key, { db: 'content_dev' })
  }
}
