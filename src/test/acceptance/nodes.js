import assert from 'assert'
import sinon from 'sinon'

import request from 'superagent'
import server from '../../app/server'

describe('/nodes', () => {
  let s
  before(() => {
    s = server.init()
  })

  after(() => {
    s.close()
  })

  it('responds with 200', (done) => {
    request.get('localhost:8080/nodes').end((err, res) => {
      assert.equal(res.statusCode, 200)
      done()
    })
  })
})

