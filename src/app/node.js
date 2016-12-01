import db from '@content/app/db'
import Observable from '@content/lib/observable'

class Node {}
Node.all = () => {
  const result = db.execute(`
    SELECT * FROM events
    WHERE type='node_create';
  `)

  const reducer = es => es.map(e => ({
    id: e.id,
  }))

  return result.map(reducer)
}

Node.create = node => {
  const result = db.execute(`
    INSERT INTO events (type, payload)
    VALUES ('node_create', '${JSON.stringify(node)}')
    RETURNING id;
  `)

  return result.map(r => r[0])
}

export default Node
