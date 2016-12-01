import { database } from '@content/test/helper'
import Node from '@content/app/node'

database(it => {
  it('creates event', t => {
    t.plan(1)
    const node = Node.create({})

    return t.deepEqual({ id: 1 }, node)
  })
})
