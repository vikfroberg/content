import assert from 'assert'
import sinon from 'sinon'
import specHelper from '../specHelper'
import { pipeA } from '../../app/async'
import {
  node_create,
  node_all,
} from '../../app/node'

describe('node', () => {
  describe('node_all', () => {
    it('returns all nodes', (done) => {
      const exercise = pipeA(
        node_create({}),
        node_all()
      )

      exercise((err, [node, nodes]) => {
        assert.deepEqual(nodes, [node])
        done()
      })
    })
  })

  describe('node_create', () => {
    it('creates a node and returns it', (done) => {
      const exercise = pipeA(
        node_create({}),
        node_all()
      )

      exercise((err, [node, nodes]) => {
        assert.deepEqual(nodes, [node])
        done()
      })
    })
  })
})

