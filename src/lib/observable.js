import Rx from 'rxjs/rx';
import Function from '@content/lib/function'

class Observable extends Rx.Observable {}
Observable.map = Function.invoke('map')

export default Observable
