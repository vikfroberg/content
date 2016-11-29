import assert from 'assert'
import sinon from 'sinon'
import specHelper from '../specHelper'
import { pipeA } from '../../app/async'
import { node_create } from '../../app/node'
import { nodes_index } from '../../app/nodes'

// AVA
describe('nodes', () => {
  describe('nodes_index', () => {
    it('return empty', (done) => {
      const json = sinon.spy()

      nodes_index({ json }, () => {
        sinon.assert.calledOnce(json)
        assert.deepEqual(json.args[0][0], { nodes: [] })
        done()
      })
    })

    it('return one', (done) => {
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
  })
})


