import assert from 'assert'
import sinon from 'sinon'

import get from '../../app/get'
import createRouter from '../../app/createRouter'

describe('createRouter()', () => {
  it('should handle not defined route', () => {
    const json = sinon.spy()

    const router = createRouter([
      get('/world', ({ json }) => json({})),
    ])
    router({
      path: '/hello',
      json: json,
    })

    sinon.assert.calledOnce(json)
    assert.deepEqual(json.args[0], [{}, 404])
  })

  it('should handle no routes', () => {
    const json = sinon.spy()

    const router = createRouter([])
    router({
      path: '/world',
      json: json,
    })

    sinon.assert.calledOnce(json)
    assert.deepEqual(json.args[0], [{}, 404])
  })

  it('should handle exact pattern', () => {
    const json = sinon.spy()

    const router = createRouter([
      get('/world', ({ json }) => json({})),
    ])
    router({
      path: '/world',
      json: json,
    })

    sinon.assert.calledOnce(json)
    assert.deepEqual(json.args[0], [{}])
  })

  it('should handle wildcard pattern', () => {
    const json = sinon.spy()

    const router = createRouter([
      get('*', ({ json }) => json({}, 404)),
    ])
    router({
      path: '/world',
      json: json,
    })

    sinon.assert.calledOnce(json)
    assert.deepEqual(json.args[0], [{}, 404])
  })
})

