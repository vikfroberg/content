import Express from 'express'
import BodyParser from 'body-parser'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { req as reqAction, createExpressMiddleware } from '@content/lib/express-redux'
import routerEpic from '@content/api/epics/router'

const middleware = () => (req, res, err) => {
  const store = createStore(
    state => state,
    applyMiddleware(
      createEpicMiddleware(routerEpic),
      createExpressMiddleware(req, res)
    )
  )
  store.dispatch(reqAction({ req, res, err }))
}

export default () => {
  const app = Express()
  app.use(Express.static('public'))
  app.use(BodyParser.urlencoded({ extended: true }))
  app.use(BodyParser.json())
  app.use(middleware())
  return app.listen(5000)
}
