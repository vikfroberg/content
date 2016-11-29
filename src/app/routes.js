import { post, get } from './route'
import { nodes_index, nodes_create } from './nodes'

export default [
  get('/nodes', nodes_index),
  post('/nodes', nodes_create),
]
