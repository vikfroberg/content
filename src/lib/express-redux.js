import { curry } from 'ramda'

export const json = curry((statusCode, response) => ({
  type: 'EXPRESS/JSON',
  payload: {
    statusCode,
    response,
  },
}))
json.toString = () => 'EXPRESS/JSON'

export const req = payload => ({
  type: 'EXPRESS/REQUEST',
  payload,
})
req.toString = () => 'EXPRESS/REQUEST'

export const redirect = url => ({
  type: 'EXPRESS/REDIRECT',
  payload: url,
})
redirect.toString = () => 'EXPRESS/REDIRECT'

export const createExpressMiddleware = (req, res) =>
  store => next => action => {
    if (action.type === json.toString()) {
      res
        .status(action.payload.statusCode)
        .json(action.payload.response)
    }
    else if (action.type === redirect.toString()) {
      res.redirect(action.payload)
    }
    return next(action)
  }
