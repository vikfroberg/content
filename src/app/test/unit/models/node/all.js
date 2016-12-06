import Node from '@content/app/node'
import Observable from '@content/lib/observable'
import { database } from '@content/test/helpers'

database(it => {
  it('returns all nodes', t => {
    t.plan(2)
    const node = Node.create({})
    const nodes = Node.all()

    return Observable.concat(
      t.deepEqual({ id: 1 }, node),
      t.deepEqual([{ id: 1 }], nodes)
    )
  })
})
