import { pipe, ofType, map, flatMap } from '@vikfroberg/func'
import { createRouter } from '@vikfroberg/router'
import { request, json } from '@vikfroberg/express-redux'

export const createRouterEpic = routes =>
  pipe(
    ofType(request),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
      json: json,
    })),
    flatMap(createRouter(routes))
  )
