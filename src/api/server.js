import 'source-map-support/register'
import Express from 'express'
import BodyParser from 'body-parser'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createExpressMiddleware } from '@content/lib/express-redux'

import { createRouterEpic } from '@content/api/epics/router'
import routes from '@content/api/routes'

const middleware = () => (req, res, err) => {
  const rootEpic = createRouterEpic(routes)
  const store = createStore(
    state => state,
    applyMiddleware(
      createEpicMiddleware(rootEpic),
      createExpressMiddleware(req, res)
    )
  )
}

const app = Express()
app.use(Express.static('public'))
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())
app.use(middleware())
export default app.listen(5000)
