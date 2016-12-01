import * as most from 'most'
import { create } from '@most/create'
import { curry } from '_/app/utils'

export const fromNode = fn =>
  create((add, end, error) =>
    fn((err, res) => {
      if (err) error(err)
      if (!err) add(res)
      end()
    }))

export const of = curry(most.of)
export const from = curry(most.from)
export const filter = curry(most.filter)
export const map = curry(most.map)
export const reduce = curry(most.reduce)
export const tap = curry(most.tap)
export const scan = curry(most.scan)
export const flatMap = curry(most.flatMap)
