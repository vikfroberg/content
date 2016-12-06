import { post, get } from '@content/lib/router'
import { map } from '@content/lib/func'

import node from '@content/app/models/node'
import { json } from '@content/app/actions'

export const index = get('/nodes', () =>
  map(json(200), node.all())
)

export const create = post('/nodes', ({ body }) =>
  map(json(200), node.create(body || {}))
)

export const nodes = [
  index,
  create,
]
