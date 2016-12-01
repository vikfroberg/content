import fs from 'fs'
import sinon from 'sinon'
import test from 'ava'
import isObservable from 'is-observable'
import Function from '@content/lib/function'
import Observable from '@content/lib/observable'
import db from '@content/app/db'
import appServer from '@content/app/server'

process.env.NODE_ENV = 'test'

const betterAssert = (method, t) =>
  Function.curry((a, xs) => {
    const assert = Function.invoker(2, method)
    if (isObservable(xs)) {
      return Observable
        .map(x => assert(x, a, t), xs)
    }
    return assert(xs, a, t)
  })

const it = (name, itFn) => {
  test(name, t => {
    return itFn({
      spy: sinon.spy,
      calledOnce: sinon.assert.calledOnce,
      plan: n => t.plan(n),
      equal: betterAssert('is', t),
      deepEqual: betterAssert('deepEqual', t),
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
  test.before(t => {
    const dropTables$ = db.execute(`
      DROP SCHEMA public CASCADE;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO public;
    `)

    const dir = `${__dirname}/../migrations`
    const files = fs.readdirSync(dir)
    const migrationFiles = files.filter(name => name.endsWith('.js'))
    const migrations = []
    migrationFiles.forEach(fileName => {
      migrations.push(require(`${dir}/${fileName}`))
    })
    const migrations$ = migrations.map(m => m.up())

    return Observable.concat(dropTables$, ...migrations$)
  })

  // beforeEach(done => {
  //   db_execute(`
  //     SELECT table_name
  //     FROM information_schema.tables
  //     WHERE table_schema = 'public'
  //     AND table_type = 'BASE TABLE'
  //   `, (err, tables) => {
  //     const tableNames = tables.map(t => t.table_name)
  //     const truncateTables = tableNames.map(t => fn =>
  //       db_execute(
  //         `TRUNCATE TABLE ${t} RESTART IDENTITY`,
  //         fn
  //       )
  //     )
  //     pipeA(...truncateTables)(done)
  //   })
  // })

  databaseFn(it)
}

export const integration = integrationFn => {
  integrationFn(it)
}
