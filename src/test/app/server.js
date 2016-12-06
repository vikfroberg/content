import request from 'superagent'
import { server } from '@content/test/helpers'
import Observable from '@content/lib/observable'

server(it => {
  it('should listen on localhost:8080', t => {
    const request = Observable.get('localhost:8080')
      .map(r => r.statusCode)

    return t.equal(200, request)
  })
})
