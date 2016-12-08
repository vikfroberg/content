import { get } from '@vikfroberg/router'
import { toObservable } from '@vikfroberg/func'
import { json } from '@vikfroberg/express-redux'
import faqJSON from '@content/api/fixtures/templates/faq'

export default [
  get('/templates/faq', () => toObservable(json(200, faqJSON))),
  get('*', () => toObservable(json(404, {}))),
]
