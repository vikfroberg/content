import db from '@content/app/db'

export const up = complete => {
  const result = db.execute(`
    create table events (
      id serial primary key not null,
      type varchar(255) not null,
      payload json not null
    );
  `)

  if (complete) {
    result.subscribe({ complete })
  }
  return result
}

export const down = complete => {
  const result = db.execute(`
    drop table events;
  `)

  if (complete) {
    result.subscribe({ complete })
  }
  return result
}
