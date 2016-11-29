import { Pool } from 'pg'

const pool = new Pool({
  database: process.env.NODE_ENV === 'test'
    ? 'content_test'
    : 'content_dev',
})

export const db_execute = (query, args, fn) => {
  const options = {
    query,
    args: fn ? args : [],
    fn: fn ? fn : args,
  }
  pool.connect((err, client, done) => {
    client.query(
      options.query,
      options.args,
      (err, result) => {
        options.fn(err, JSON.parse(JSON.stringify(result.rows)))
        done()
      },
    )
  })
}
