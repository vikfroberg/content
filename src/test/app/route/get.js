import { unit } from '@content/test/helper'
import { get } from '@content/app/route'

unit(it => {
  it('retuns a route object', t => {
    const route = {
      method: 'GET',
      pattern: '/hello',
      handler: () => {},
    }

    t.deepEqual(
      get(route.pattern, route.handler),
      route
    )
  })
})
