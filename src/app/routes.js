import { post, get } from '@content/app/route'
import nodes from '@content/app/nodes'

export default [
  get('/nodes', nodes.index),
  post('/nodes', nodes.create),
  get('*', ({ json }) => { json({}) }),
]
