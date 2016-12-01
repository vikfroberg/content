import test from 'ava'

export const bug = (name, testFn) => {
  return test(name, t => {
    return testFn({
      plan: n => t.plan(n),
      log: a => console.log(a),
      deepEqual: (a, b) => console.log({ a, b }),
    })
  })
}
