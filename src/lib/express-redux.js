import { curry } from 'ramda'
import { createAction } from 'redux-actions'

export const json = createAction(
  'EXPRESS/JSON',
  (response, statusCode = 200) => ({
    statusCode,
    response,
  })
)
export const send = createAction(
  'EXPRESS/SEND',
  (response, statusCode = 200) => ({
    statusCode,
    response,
  })
)
export const request = createAction('EXPRESS/REQUEST')
export const redirect = createAction('EXPRESS/REDIRECT')

export const createExpressMiddleware = (req, res) =>
  store => {
    setTimeout(() => {
      store.dispatch(request({ req, res }))
    })
    return next => action => {
      if (action.type === json.toString()) {
        res
          .status(action.payload.statusCode)
          .json(action.payload.response)
      }
      else if (action.type === send.toString()) {
        res
          .status(action.payload.statusCode)
          .send(action.payload.response)
      }
      else if (action.type === redirect.toString()) {
        res.redirect(action.payload)
      }
      return next(action)
    }
  }
