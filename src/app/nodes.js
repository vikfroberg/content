import node from '@content/app/node'

class Nodes {}

Nodes.index = ({ json }, done) => {
  node.all().subscribe({
    next: nodes => { json({ nodes }) },
  })
}

Nodes.create = ({ json }) => {
  node.create({}).subscribe({
    next: node => { json({ node }) },
  })
}

export default Nodes
