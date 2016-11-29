import sinon from 'sinon'
import databaseHelper from '_/test/databaseHelper'
import { it } from '_/test/helper'
import { pipeA } from '_/app/async'
import { node_create } from '_/app/node'
import { nodes_index } from '_/app/nodes'

it('return empty', (assert, done) => {
  const json = sinon.spy()

  nodes_index({ json }, () => {
    sinon.assert.calledOnce(json)
    assert.deepEqual(json.args[0][0], { nodes: [] })
    done()
  })
})

it('return one', (assert, done) => {
  const json = sinon.spy()

  const exercise = pipeA(
    node_create({}),
    nodes_index({ json })
  )

  exercise((err, [node]) => {
    sinon.assert.calledOnce(json)
    assert.deepEqual(
      json.args[0][0],
      { nodes: [node] }
    )
    done()
  })
})
