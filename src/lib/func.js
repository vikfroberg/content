import Ramda from 'ramda'
import Rx from 'rxjs'
import superagent from 'superagent'
import isObservable from 'is-observable'

export const flow = ([arg, ...args]) =>
  Ramda.pipe(...args)(arg)

export const fetch = (...args) =>
  Rx.Observable.bindNodeCallback((url, options = {}, fn) => {
    const finalOptions = {
      method: 'GET',
      headers: {},
      ...options,
    }
    const request = superagent(finalOptions.method, url)
    Object.keys(finalOptions.headers).forEach(key => {
      request.set(key, finalOptions.headers[key])
    })
    if (finalOptions.body) {
      request.send(finalOptions.body)
    }
    return request.end(fn)
  })(args[0], args[1])

export const log = a => {
  if (process.env.NODE_ENV === 'development') {
    console.log(a)
  }
}

export const trace = xs => isObservable(xs)
  ? xs.do(log)
  : Ramda.tap(log)

export const prop = Ramda.prop

export const pipe = Ramda.pipe

export const curry = Ramda.curry

export const compose = Ramda.compose

export const flatMap = curry((fn, xs) => isObservable(xs)
  ? xs.flatMap(fn)
  : Ramda.chain(fn, xs)
)

export const map = curry((fn, xs) => isObservable(xs)
  ? xs.map(fn)
  : Ramda.map(fn, xs)
)

export const ofType = curry((t, xs) => isObservable(xs)
  ? xs.filter(a => a.type === t.toString())
  : Ramda.filter(a => a.type === t.toString(), xs)
)

export const toObservable = (...args) =>
  Rx.Observable.from(args)
