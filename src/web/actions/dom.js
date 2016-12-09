import fs from 'fs'
import { html } from 'common-tags'
import { send } from '@vikfroberg/express-redux'
import { map } from '@vikfroberg/func'
import * as DOM from '@content/web/helpers/dom'


const dir = `${__dirname}/../../../src/web/public/css`
const cssLinkTags = () =>
  map(
    fileName => `
      <link
        rel="stylesheet"
        type="text/css"
        href="/assets/css/${fileName}"
      />
    `,
    fs.readdirSync(dir)
  )

export const renderToString = (component, meta = {}, statusCode) =>
  send(html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${meta.title || ''}</title>
      ${cssLinkTags()}
    </head>
    <body>
      <div id="app">
        ${DOM.renderToString(component)}
      </div>
    </body>
    </html>
  `, statusCode)
