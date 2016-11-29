import { it } from '_/test/helper'
import { db_execute } from '_/app/db'

it('queries the database', (assert, done) => {
  db_execute('', [], (err, result) => {
    assert.deepEqual(result, [])
    done()
  })
})

it('allows no args', (assert, done) => {
  db_execute('', done)
})
