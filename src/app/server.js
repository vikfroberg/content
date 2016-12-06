import Express from 'express'
import BodyParser from 'body-parser'
import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootEpic from '@content/app/epics'
import * as actions from '@content/app/actions'
import { log } from '@content/lib/func'

const middleware = () => (req, res, err) => {
  const epicMiddleware = createEpicMiddleware(rootEpic)
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

const bootstrap = () => {
  const app = Express()
  app.use(Express.static('public'))
  app.use(BodyParser.urlencoded({ extended: true }))
  app.use(BodyParser.json())
  app.use(middleware())
  return app.listen(8080)
}

exports.init = () => bootstrap()
