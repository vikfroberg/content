import Express from 'express'
import BodyParser from 'body-parser'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { log } from '@content/lib/func'
import routerEpic from '@content/api/epics/router'
import * as actions from '@content/api/actions'

const middleware = () => (req, res, err) => {
  const epicMiddleware = createEpicMiddleware(routerEpic)
  const store = createStore(
    state => state,
    applyMiddleware(
      epicMiddleware,
      store => next => action => {
        if (action.type === actions.log.toString()) {
          log(action.payload)
        }
        else if (action.type === actions.json.toString()) {
          res
            .status(action.payload.statusCode)
            .json(action.payload.response)
        }
        else if (action.type === actions.redirect.toString()) {
          res.redirect(action.payload)
        }
        return next(action)
      }
    )
  )
  store.dispatch(actions.req({ req, res, err }))
}

const app = Express()
app.use(Express.static('public'))
app.use(BodyParser.urlencoded({ extended: true }))
app.use(BodyParser.json())
app.use(middleware())
export default app.listen(3000)


