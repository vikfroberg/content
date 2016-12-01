import Postgres from '@content/lib/postgres'
import { integration, unit } from '@content/test/helper'

integration(it => {
  it('works', t => {
    t.plan(1)
    const pg = Postgres.pool({
      database: 'content_test',
    })

    return t.deepEqual([], pg.execute(''))
  })
})

unit(it => {
  it('returns rows if no error', t => {
    t.plan(1)
    const rows = [1, 3, 5]
    const client = { query: (q, a, fn) => fn(null, { rows }) }
    const pool = { connect: fn => fn(null, client) }

    const pg = new Postgres(pool)

    return t.equal(rows, pg.execute(''))
  })

  it('throws for connection error', t => {
    t.plan(1)
    const err = new Error('fake error')
    const pool = { connect: fn => fn(err) }

    const pg = new Postgres(pool)

    return t.throws(err.message, pg.execute(''))
  })

  it('throws for query error', t => {
    t.plan(1)
    const err = new Error('fake error')
    const client = { query: (q, a, fn) => fn(err) }
    const pool = { connect: fn => fn(null, client) }

    const pg = new Postgres(pool)

    return t.throws(err.message, pg.execute(''))
  })
})
