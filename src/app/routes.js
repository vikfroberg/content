import { post, get } from '_/app/route'
import { nodes_index, nodes_create } from '_/app/nodes'

export default [
  get('/nodes', nodes_index),
  post('/nodes', nodes_create),
]
