import { get } from '@content/lib/router'
import { toObservable } from '@content/lib/func'
import { json } from '@content/app/actions'
import { nodes } from '@content/app/routes/nodes'

export default [
  ...nodes,
  get('*', () => toObservable(json(404, {}))),
]
