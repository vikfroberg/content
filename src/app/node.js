import { curry } from '_/app/utils'
import { db_execute } from '_/app/db'

export const node_all = curry(cb => {
  db_execute(`
    SELECT * FROM events
    WHERE type='node_create';
    `,
    (err, events) => {
      const nodes = events.map(event => ({
        id: event.id,
      }))
      cb(err, nodes)
    }
  )
})

export const node_create = curry((node, cb) => {
  db_execute(`
    INSERT INTO events (type, payload)
    VALUES ('node_create', '${JSON.stringify(node)}')
    RETURNING id;
    `,
    (err, result) => cb(err, result[0])
  )
})
