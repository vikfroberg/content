import fs from 'fs'
import sinon from 'sinon'
import test from 'ava'
import isObservable from 'is-observable'
import Func from '@content/lib/function'
import Observable from '@content/lib/observable'
import db from '@content/api/db'
import appServer from '@content/api/server'

process.env.NODE_ENV = 'test'

const smartAssert = (method, t) => (a, xs) => {
  const assert = Func.invoker(2, method)
  if (isObservable(xs)) {
    return Observable
      .map(x => assert(x, a, t), xs)
  }
  return assert(xs, a, t)
}

const it = (name, itFn) => {
  test(name, t => {
    return itFn({
      spy: sinon.spy,
      calledOnce: sinon.assert.calledOnce,
      plan: n => t.plan(n),
      equal: smartAssert('is', t),
      deepEqual: smartAssert('deepEqual', t),
      throws: (a, b) => t.throws(b, a),
    })
  })
}

export const unit = unitFn => {
  unitFn(it)
}

export const server = serverFn => {
  let s
  test.beforeEach(() => {
    s = appServer.init()
  })
  test.afterEach(() => {
    s.close()
  })
  serverFn(it)
}

export const database = databaseFn => {
  test.beforeEach(t => {
    const dropTables$ = db.execute(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO public;
    `)

    const dir = `${__dirname}/../../migrations`
    const files = fs.readdirSync(dir)
    const migrationFiles = files.filter(name => name.endsWith('.js'))
    const migrations = []
    migrationFiles.forEach(fileName => {
      migrations.push(require(`${dir}/${fileName}`))
    })
    const migrations$ = migrations.map(m => m.up())

    return Observable.concat(dropTables$, ...migrations$)
  })
  databaseFn(it)
}

export const integration = integrationFn => {
  integrationFn(it)
}
