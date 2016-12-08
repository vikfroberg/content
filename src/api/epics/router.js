import {
  pipe,
  trace,
  ofType,
  map,
  flatMap,
  toObservable,
} from '@vikfroberg/func'
import { createRouter } from '@vikfroberg/router'
import { request } from '@vikfroberg/express-redux'

export const createRouterEpic = routes =>
  pipe(
    ofType(request),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
    })),
    flatMap(createRouter(routes))
  )
