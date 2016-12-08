import {
  pipe,
  trace,
  ofType,
  map,
  flatMap,
  toObservable,
} from '@content/lib/func'
import { createRouter } from '@content/lib/router'
import { request } from '@content/lib/express-redux'

export const createRouterEpic = routes =>
  pipe(
    ofType(request),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
    })),
    flatMap(createRouter(routes))
  )
