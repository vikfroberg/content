import {
  pipe,
  trace,
  ofType,
  map,
  flatMap,
  toObservable,
} from '@content/lib/func'
import { createRouter } from '@content/lib/router'
import routes from '@content/app/routes'
import * as actions from '@content/app/actions'

const createRouterEpic = routes =>
  pipe(
    ofType(actions.req),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
    })),
    flatMap(createRouter(routes))
  )

export default createRouterEpic(routes)
