import migrate from 'migrate'
import fs from 'fs'
import { before, beforeEach } from '_/test/helper'
import { pipeA } from '_/app/async'
import { db_execute } from '_/app/db'

before(done => {
  db_execute(`
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
    GRANT ALL ON SCHEMA public TO public;`,
    () => {
      fs.unlinkSync('.migrate_test')
      const set = migrate.load('.migrate_test', 'dist/migrations');
      set.up((err) => {
        if (err) throw err
        done()
      })
    }
  )
})

beforeEach(done => {
  db_execute(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  `, (err, tables) => {
    const tableNames = tables.map(t => t.table_name)
    const truncateTables = tableNames.map(t => fn =>
      db_execute(
        `TRUNCATE TABLE ${t} RESTART IDENTITY`,
        fn
      )
    )
    pipeA(...truncateTables)(done)
  })
})


