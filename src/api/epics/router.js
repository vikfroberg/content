import {
  pipe,
  trace,
  ofType,
  map,
  flatMap,
  toObservable,
} from '@content/lib/func'
import { createRouter } from '@content/lib/router'
import routes from '@content/api/routes'
import { req } from '@content/lib/express-redux'

const createRouterEpic = routes =>
  pipe(
    ofType(req),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
    })),
    flatMap(createRouter(routes))
  )

export default createRouterEpic(routes)
