import Express from 'express'
import BodyParser from 'body-parser'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { createExpressMiddleware } from '@vikfroberg/express-redux'

import { createRouterEpic } from '@content/api/epics/router'

const middleware = () => (req, res, err) => {
  const rootEpic = createRouterEpic([])
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
export default app.listen(3000)


