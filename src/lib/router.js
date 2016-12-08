import pathToRegexp from 'path-to-regexp'

export const post = (pattern, handler) => {
  return {
    method: 'POST',
    pattern,
    handler,
  }
}

export const get = (pattern, handler) => {
  return {
    method: 'GET',
    pattern,
    handler,
  }
}

export const createRouter = routes => context => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    const methodMatches = route.method === context.method
    const pathRegexp = pathToRegexp(route.pattern)
    const pathMatches = !!pathRegexp.exec(context.path)
    const wildMatches = route.pattern === '*'
    if (methodMatches && (pathMatches || wildMatches)) {
      return route.handler(context)
    }
  }
}
