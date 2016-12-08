import {
  pipe,
  ofType,
  map,
  flatMap,
  toObservable,
} from '@vikfroberg/func'
import { html } from 'common-tags'
import { createRouter } from '@vikfroberg/router'
import { send, request, json } from '@vikfroberg/express-redux'
import { renderToString } from '@content/web/helpers/dom'

const render = (component, meta = {}, statusCode = 200) => {
  return send(statusCode, html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${meta.title || ''}</title>
    </head>
    <body>
      <div id="app">
        ${renderToString(component)}
      </div>
    </body>
    </html>
  `)
}

export const createRouterEpic = routes =>
  pipe(
    ofType(request),
    map(action => ({
      method: action.payload.req.method,
      path: action.payload.req.originalUrl,
      render,
      json,
    })),
    flatMap(createRouter(routes))
  )

