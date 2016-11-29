import assert from 'assert'
import sinon from 'sinon'

import get from '../../app/get'

describe('get()', () => {
  it('should return an route object', () => {
    const route = {
      method: 'get',
      pattern: '/hello',
      handler: () => {},
    }
    assert.deepEqual(
      get(route.pattern, route.handler),
      route
    )
  })
})

