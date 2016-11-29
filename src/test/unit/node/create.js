import databaseHelper from '_/test/databaseHelper'
import { it } from '_/test/helper'
import { node_create } from '_/app/node'

it('creates a node and returns it', (assert, done) => {
  node_create({}, (err, node) => {
    assert.deepEqual({ id: 1 }, node)
    done()
  })
})


