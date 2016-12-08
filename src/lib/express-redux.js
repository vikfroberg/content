import { curry } from 'ramda'

export const json = curry((statusCode, response) => ({
  type: 'EXPRESS/JSON',
  payload: {
    statusCode,
    response,
  },
}))
json.toString = () => 'EXPRESS/JSON'

export const send = curry((statusCode, response) => ({
  type: 'EXPRESS/SEND',
  payload: {
    statusCode,
    response,
  },
}))
send.toString = () => 'EXPRESS/SEND'

export const request = payload => ({
  type: 'EXPRESS/REQUEST',
  payload,
})
request.toString = () => 'EXPRESS/REQUEST'

export const redirect = url => ({
  type: 'EXPRESS/REDIRECT',
  payload: url,
})
redirect.toString = () => 'EXPRESS/REDIRECT'

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
