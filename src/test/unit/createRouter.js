import sinon from 'sinon'
import { it } from '_/test/helper'
import { get } from '_/app/route'
import createRouter from '_/app/createRouter'

it('should handle not defined route', assert => {
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

it('should handle no routes', assert => {
  const json = sinon.spy()

  const router = createRouter([])
  router({
    path: '/world',
    json: json,
  })

  sinon.assert.calledOnce(json)
  assert.deepEqual(json.args[0], [{}, 404])
})

it('should handle exact pattern', assert => {
  const json = sinon.spy()

  const router = createRouter([
    get('/world', ({ json }) => json({})),
  ])
  router({
    method: 'GET',
    path: '/world',
    json: json,
  })

  sinon.assert.calledOnce(json)
  assert.deepEqual(json.args[0], [{}])
})

it('should handle wildcard pattern', assert => {
  const json = sinon.spy()

  const router = createRouter([
    get('*', ({ json }) => json({}, 200)),
  ])
  router({
    method: 'GET',
    path: '/world',
    json: json,
  })

  sinon.assert.calledOnce(json)
  assert.deepEqual(json.args[0], [{}, 200])
})

