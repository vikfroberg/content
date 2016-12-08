import { unit } from '@content/test/helpers'
import { post } from '@content/api/route'

unit(it => {
  it('retuns a route object', t => {
    const route = {
      method: 'POST',
      pattern: '/hello',
      handler: () => {},
    }

    t.deepEqual(
      post(route.pattern, route.handler),
      route
    )
  })
})
