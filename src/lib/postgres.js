import { Pool } from 'pg'
import Observable from '@content/lib/observable'

class Postgres {
  constructor(pool) {
    this.pool = pool
  }

  static pool(config) {
    return new Postgres(new Pool(config))
  }

  execute(query, args) {
    return Observable.bindNodeCallback(fn => {
      this.pool.connect((err, client, done) => {
        if (err) return fn(err)
        client.query(
          query,
          args,
          (err, res) => {
            if (err) return fn(err)
            fn(null, JSON.parse(JSON.stringify(res.rows)))
            done()
          },
        )
      })
    })()
  }
}

export default Postgres
