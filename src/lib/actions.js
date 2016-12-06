import Function from '@content/lib/function'

export const createAction = (type, fn) => {
  const actionCreator = Function.curryN(fn.length, (...args) => {
    return { type, payload: fn(args) }
  })
  actionCreator.toString = () => type
  return actionCreator
}

