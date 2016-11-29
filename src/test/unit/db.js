import assert from 'assert'
import sinon from 'sinon'
import specHelper from '../specHelper'
import { db_execute } from '../../app/db'

describe('db', () => {
  describe('db_execute', () => {
    it('queries the database', (done) => {
      db_execute('', [], (err, result) => {
        assert.deepEqual(result, [])
        done()
      })
    })

    it('allows no args', (done) => {
      db_execute('', done)
    })
  })
})
