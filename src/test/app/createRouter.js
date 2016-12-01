import sinon from 'sinon'
import { unit } from '@content/test/helper'
import { get } from '@content/app/route'
import createRouter from '@content/app/createRouter'

unit(it => {
  it('should handle not defined route', t => {
    const json = t.spy()

    const router = createRouter([
      get('/world', ({ json }) => json({})),
    ])
    router({
      path: '/hello',
      json: json,
    })

    t.calledOnce(json)
    t.deepEqual(json.args[0], [{}, 404])
  })

  it('should handle no routes', t => {
    const json = t.spy()

    const router = createRouter([])
    router({
      path: '/world',
      json: json,
    })

    t.calledOnce(json)
    t.deepEqual(json.args[0], [{}, 404])
  })

  it('should handle exact pattern', t => {
    const json = t.spy()

    const router = createRouter([
      get('/world', ({ json }) => json({})),
    ])
    router({
      method: 'GET',
      path: '/world',
      json: json,
    })

    t.calledOnce(json)
    t.deepEqual(json.args[0], [{}])
  })

  it('should handle wildcard pattern', t => {
    const json = t.spy()

    const router = createRouter([
      get('*', ({ json }) => json({}, 200)),
    ])
    router({
      method: 'GET',
      path: '/world',
      json: json,
    })

    t.calledOnce(json)
    t.deepEqual(json.args[0], [{}, 200])
  })
})
