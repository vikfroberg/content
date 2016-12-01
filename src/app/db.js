import { Pool } from 'pg'
import config from '_/app/config'
import { fromNode } from '_/app/observable'

export const stubs = {}

stubs.pool = new Pool({
  database: config('db'),
})

const executeFn = (query, args, fn) => {
  stubs.pool.connect((err, client, done) => {
    if (err) return fn(err)
    client.query(
      query,
      args,
      (err, res) => {
        if (err) return fn(err)
        fn(null, res.rows)
        done()
      },
    )
  })
}

export const execute = (query, args) =>
  fromNode(fn => executeFn(query, args, fn))

