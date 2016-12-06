import { post, get } from '@content/app/route'
import { toObservable } from '@content/lib/func'
import { json } from '@content/app/actions'
import nodes from '@content/app/nodes'

export default [
  get('/nodes', nodes.index),
  post('/nodes', nodes.create),
  get('*', () => toObservable(json(404, {}))),
]
