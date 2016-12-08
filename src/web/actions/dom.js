import { html } from 'common-tags'
import { send } from '@vikfroberg/express-redux'
import * as DOM from '@content/web/helpers/dom'

export const renderToString = (component, meta = {}, statusCode) =>
  send(html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${meta.title || ''}</title>
    </head>
    <body>
      <div id="app">
        ${DOM.renderToString(component)}
      </div>
    </body>
    </html>
  `, statusCode)
