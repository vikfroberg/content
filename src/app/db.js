import { Pool } from 'pg'

const pool = new Pool({
  database: 'content_dev',
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
        options.fn(err, result.rows)
        done()
      },
    )
  })
}
