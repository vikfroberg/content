import { get } from '@vikfroberg/router'
import { fetch, toObservable } from '@vikfroberg/func'
import FaqNew from '@content/web/views/faq/new'

export default [
  get('/faq/new', ({ render }) =>
    fetch('http://localhost:5000/templates/faq')
      .map(res =>
        render(FaqNew({ template: res.body }))
      )
  ),
  get('*', ({ json }) => toObservable(json({}, 404))),
]

