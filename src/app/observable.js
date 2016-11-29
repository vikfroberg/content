import * as most from 'most'
import { curry } from '_/app/utils'

export const filter = curry(most.filter)
export const map = curry(most.map)
export const reduce = curry(most.reduce)
export const tap = curry(most.tap)
export const scan = curry(most.scan)
export const flatMap = curry(most.flatMap)
