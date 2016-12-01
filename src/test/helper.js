import sinon from 'sinon'
import test from 'ava'
import isObservable from 'is-observable'
import Function from '@content/lib/function'
import Observable from '@content/lib/observable'

process.env.NODE_ENV = 'test'

const smarterAssert = (method, t) =>
  Function.curry((a, xs) => {
    if (isObservable(xs)) {
      return Observable
        .map(x => Function.invoke(method, t)(x, a), xs)
    }
    return Function.invoke(method)(xs, a)
  })

const it = (name, itFn) => {
  test(name, t => {
    itFn({
      spy: Function.invoke('spy', sinon),
      plan: Function.invoke('plan', t),
      equal: smarterAssert('is', t),
      deepEqual: smarterAssert('deepEqual', t),
      throws: smarterAssert('throws', t),
    })
  })
}

export const unit = unitFn => {
  unitFn(it)
}

export const integration = integrationFn => {
  integrationFn(it)
}
