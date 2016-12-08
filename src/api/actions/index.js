import { curry } from '@content/lib/func'

export const json = curry((statusCode, response) => ({
  type: 'JSON',
  payload: {
    statusCode,
    response,
  },
}))
json.toString = () => 'JSON'

export const req = payload => ({
  type: 'REQUEST',
  payload,
})
req.toString = () => 'REQUEST'

export const log = msg => ({
  type: 'LOG',
  payload: msg,
})
log.toString = () => 'LOG'

export const redirect = url => ({
  type: 'REDIRECT',
  payload: url,
})
redirect.toString = () => 'REDIRECT'
