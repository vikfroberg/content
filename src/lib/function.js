import Ramda from 'ramda'

class Func {}
Func.invoke = Ramda.invoker(1)
Func.invoker = Ramda.invoker
Func.curry = Ramda.curry

export default Func

