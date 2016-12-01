import Rx from 'rxjs/rx';
import request from 'superagent';
import Function from '@content/lib/function'

class Observable extends Rx.Observable {}
Observable.map = Function.invoke('map')
Observable.get = url => {
  return Rx.Observable.bindNodeCallback(
    (url, fn) => request.get(url).end(fn)
  )(url)
}

export default Observable
