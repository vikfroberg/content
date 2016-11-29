export default (routes) => (context) => {
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    const methodMatches = route.method === context.method
    const pathMatches = route.pattern === context.path
    const wildMatches = route.pattern === '*'
    if (methodMatches && (pathMatches || wildMatches)) {
      return route.handler(context, () => {})
    }
  }
  return context.json({}, 404)
}


