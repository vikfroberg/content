import request from 'superagent'
import { before, after, it } from '_/test/helper'
import server from '_/app/server'

let s
before(() => {
  s = server.init()
})

after(() => {
  s.close()
})

it('should listen on localhost:8080', (assert, done) => {
  request.get('localhost:8080').end((err, res) => {
    assert.is(res.statusCode, 404)
    done()
  })
})

