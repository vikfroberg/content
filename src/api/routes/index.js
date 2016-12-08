import { get } from '@content/lib/router'
import { toObservable } from '@content/lib/func'
import { json } from '@content/lib/express-redux'
import faqJSON from '@content/api/fixtures/templates/faq'

export default [
  get('/templates/faq', () => toObservable(json(200, faqJSON))),
  get('*', () => toObservable(json(404, {}))),
]
