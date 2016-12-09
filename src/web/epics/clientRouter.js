import { createRouter } from '@vikfroberg/router'
import { request } from '@vikfroberg/page-redux'
import { renderToDOM } from '@content/web/actions/dom'

export const createRouterEpic = routes => actions =>
  actions
    .ofType(request)
    .map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
      render: renderToDOM,
    }))
    .flatMap(createRouter(routes))


