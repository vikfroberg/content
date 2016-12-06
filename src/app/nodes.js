import node from '@content/app/node'
import { map } from '@content/lib/func'
import { json } from '@content/app/actions'

class Nodes {
  static index() {
    return map(json(200), node.all())
  }
  static create({ body = {} }) {
    return map(json(200), node.create(body))
  }
}

export default Nodes
