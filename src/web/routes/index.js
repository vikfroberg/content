import { get } from '@vikfroberg/router'
import { flow, map, fetch, toObservable } from '@vikfroberg/func'
import { code } from '@content/web/helpers/dom'

const FaqNew = ({ template }) =>
  code(JSON.stringify(template))

export default [
  get('/faq/new', ({ render }) => flow([
    fetch('http://localhost:5000/templates/faq'),
    map(res =>
      render(FaqNew({ template: res.body }))
    ),
  ])),
  get('*', ({ json }) => toObservable(json({}, 404))),
]

