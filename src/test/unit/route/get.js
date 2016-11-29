import { it } from '_/test/helper'
import { get } from '_/app/route'

it('retuns a route object', assert => {
  const route = {
    method: 'GET',
    pattern: '/hello',
    handler: () => {},
  }

  assert.deepEqual(
    get(route.pattern, route.handler),
    route
  )
})
