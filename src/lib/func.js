import Ramda from 'ramda'
import Rx from 'rxjs'
import _isObservable from 'is-observable'

export const isObservable = _isObservable

export const log = a => {
  if (process.env.NODE_ENV === 'development') {
    console.log(a)
  }
}

export const trace = xs => isObservable(xs)
  ? xs.do(log)
  : Ramda.tap(log)

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
