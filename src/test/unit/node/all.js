import databaseHelper from '_/test/databaseHelper'
import { it } from '_/test/helper'
import { pipeA } from '_/app/async'
import { node_create, node_all } from '_/app/node'

it('returns all nodes', (assert, done) => {
  const exercise = pipeA(
    node_create({}),
    node_all()
  )

  exercise((err, [node, nodes]) => {
    assert.deepEqual(nodes, [node])
    done()
  })
})
