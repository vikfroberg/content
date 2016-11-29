import 'source-map-support/register'
import { pipeA } from '../app/async'
import { db_execute } from '../app/db'

beforeEach(done => {
  db_execute(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
  `, (err, tables) => {
    const tableNames = tables.map(t => t.table_name)
    const truncateTables = tableNames.map((t) => (_, fn) =>
      db_execute(
        `TRUNCATE TABLE ${t} RESTART IDENTITY`,
        fn
      )
    )
    pipeA(...truncateTables)(done)
  })
})

