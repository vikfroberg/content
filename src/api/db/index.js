import Postgres from '@content/lib/postgres'
import config from '@content/api/config'

export default Postgres.pool({
  database: config('database'),
})
