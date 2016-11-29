import { curry } from 'ramda'
import { node_create, node_all } from './node'

export const nodes_index = curry(({ json }, done) => {
  node_all((err, nodes) => {
    json({ nodes })
    done()
  })
})

export const nodes_create = curry(({ json }, done) => {
  node_create({}, (err, node) => {
    json({ node })
    done()
  })
})
