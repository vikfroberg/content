import { get } from '@vikfroberg/router'
import { toObservable } from '@vikfroberg/func'
import faqJSON from '@content/api/fixtures/templates/faq'

export default [
  get('/templates/faq', ({ json }) => toObservable(json(200, faqJSON))),
  get('*', ({ json }) => toObservable(json(404, {}))),
]
