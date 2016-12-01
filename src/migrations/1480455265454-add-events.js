import { db_execute } from '_/app/db'

export const up = done => {
  db_execute(`
    create table events (
      id serial primary key not null,
      type varchar(255) not null,
      payload json not null
    );
  `, done)
}

export const down = done => {
  db_execute(`
    drop table events;
  `, done)
}
