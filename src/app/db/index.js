import Postgres from '@content/lib/postgres'
import config from '@content/app/config'

export default Postgres.pool({
  database: config('database'),
})
