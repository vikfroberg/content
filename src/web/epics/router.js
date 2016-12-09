import { pipe, ofType, map, flatMap } from '@vikfroberg/func'
import { createRouter } from '@vikfroberg/router'
import { json, request } from '@vikfroberg/express-redux'
import { renderToString } from '@content/web/actions/dom'

export const createRouterEpic = routes =>
  pipe(
    ofType(request),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
      render: renderToString,
      json: json,
    })),
    flatMap(createRouter(routes))
  )
