import Ramda from 'ramda'

class Func {}
Func.invoke = Ramda.invoker(1)
Func.curry = Ramda.curry

export default Func

