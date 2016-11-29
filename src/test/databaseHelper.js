import { beforeEach } from '_/test/helper'
import { pipeA } from '_/app/async'
import { db_execute } from '_/app/db'

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


