import { curry } from 'ramda'
import { db_execute } from '_/app/db'

export const node_all = curry((cb) => {
  db_execute('SELECT * FROM nodes', cb)
})

export const node_create = curry((node, cb) => {
  db_execute(
    'INSERT INTO nodes DEFAULT VALUES RETURNING *',
    (err, result) => cb(err, result[0])
  )
})
