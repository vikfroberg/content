import Express from 'express'
import BodyParser from 'body-parser'
import createRouter from './createRouter'
import routes from './routes'

// TODO: Unit test...
const json = (res) => (json, statusCode = 200) => {
  res.status(statusCode).json(json)
}

const middleware = (routes) => (req, res, err) => {
  console.log(req.method, req.originalUrl)
  const router = createRouter(routes)
  router({
    method: req.method,
    path: req.originalUrl,
    json: json(res),
  })
}

const bootstrap = ({ routes }) => {
  const app = Express()
  app.use(Express.static('public'))
  app.use(BodyParser.urlencoded({ extended: true }))
  app.use(BodyParser.json())
  app.use(middleware(routes))
  return app.listen(8080)
}

exports.init = () => {
  return bootstrap({
    routes,
  })
}
