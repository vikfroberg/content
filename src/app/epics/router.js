import {
  pipe,
  trace,
  ofType,
  map,
  flatMap,
  toObservable,
} from '@content/lib/func'
import routes from '@content/app/routes'
import * as actions from '@content/app/actions'

const createRouterEpic = routes =>
  pipe(
    ofType(actions.req),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
    })),
    flatMap(routeHandler(routes))
  )

const routeHandler = routes => context => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    const methodMatches = route.method === context.method
    const pathMatches = route.pattern === context.path
    const wildMatches = route.pattern === '*'
    if (methodMatches && (pathMatches || wildMatches)) {
      return route.handler(context)
    }
  }
  return toObservable(actions.json(404, {}))
}

export default createRouterEpic(routes)
