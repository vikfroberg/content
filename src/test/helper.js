import test from 'ava'

process.env.NODE_ENV = 'test'

export const describe = (group, fn) => {
  fn((name, fn) =>
    fn.length <= 1
    ? test(`${group} > ${name}`, fn)
    : test.cb(`${group} > ${name}`, t => fn(t, t.end))
  )
}

export const it = (name, fn) => fn.length <= 1
    ? test(name, fn)
    : test.cb(name, t => fn(t, t.end))

export const before = fn => fn.length < 1
  ? test.before(fn)
  : test.before.cb(t => fn(t.end))

export const after = fn => fn.length < 1
  ? test.after(fn)
  : test.after.cb(t => fn(t.end))

export const beforeEach = fn => fn.length < 1
  ? test.beforeEach(fn)
  : test.beforeEach.cb(t => fn(t.end))

export const afterEach = fn => fn.length < 1
  ? test.afterEach(fn)
  : test.afterEach.cb(t => fn(t.end))
