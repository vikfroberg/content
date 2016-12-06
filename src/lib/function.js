import Ramda from 'ramda'

class Func {}
Func.invoke = Ramda.invoker(1)
Func.invoker = Ramda.invoker
Func.curry = Ramda.curry
Func.curryN = Ramda.curryN

export default Func

