import db from '@content/app/db'
import { map } from '@content/lib/func'

class Node {
  static all() {
    const result = db.execute(`
      SELECT * FROM events
      WHERE type='node_create';
    `)

    const reducer = map(e => ({
      id: e.id,
    }))

    return map(reducer, result)
  }
  static create(node) {
    const result = db.execute(`
      INSERT INTO events (type, payload)
      VALUES ('node_create', '${JSON.stringify(node)}')
      RETURNING id;
    `)

    return map(r => r[0], result)
  }
}

export default Node
