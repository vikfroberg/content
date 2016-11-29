export const pipeA = (...fns) => (done) => {
  let results = []
  let i = 0
  const next = (err, result) => {
    if (err) {
      return done(err, results)
    }
    if (i !== 0) {
      results.push(result)
    }
    if (i < fns.length) {
      const fn = fns[i++]
      if (fn.length === 1) {
        return fn(next)
      }
      return fn(result, next)
    }
    return done(null, results)
  }
  next()
}


