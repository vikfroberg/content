import assert from 'assert'
import sinon from 'sinon'

import request from 'superagent'
import server from '../../app/server'

describe('server.bootstrap()', () => {
  let s
  before(() => {
    s = server.init()
  })

  after(() => {
    s.close()
  })

  it('should listen on localhost:8080', (done) => {
    request.get('localhost:8080').end((err, res) => {
      assert.equal(res.statusCode, 404)
      done()
    })
  })
})

