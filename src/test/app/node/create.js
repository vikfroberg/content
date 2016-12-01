import { database } from '@content/test/helper'
import Nodes from '@content/app/node'

database(it => {
  it('creates event', t => {
    t.plan(1)
    const node = Nodes.create({})

    return t.deepEqual({ id: 1 }, node)
  })
})
