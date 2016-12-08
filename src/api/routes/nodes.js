import { post, get } from '@vikfroberg/router'
import { map } from '@vikfroberg/func'

import node from '@content/api/models/node'
import { json } from '@content/api/actions'

export const index = get('/nodes', () =>
  map(json(200), node.all())
)

export const create = post('/nodes', ({ body }) =>
  map(json(200), node.create(body || {}))
)

export default [
  index,
  create,
]
