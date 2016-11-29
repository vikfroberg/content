import { it } from '_/test/helper'
import { post } from '_/app/route'

it('retuns a route object', assert => {
  const route = {
    method: 'POST',
    pattern: '/hello',
    handler: () => {},
  }

  assert.deepEqual(
    post(route.pattern, route.handler),
    route
  )
})

