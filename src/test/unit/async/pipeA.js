import { it } from '_/test/helper'
import { pipeA } from '_/app/async'

it('passes error', (assert, done) => {
  const fn = (_, next) => next(new Error('lol'))
  pipeA(fn)(err => {
    assert.deepEqual(err, new Error('lol'))
    done()
  })
})

it('passes results', (assert, done) => {
  const fn = (_, next) => next(null, 1)
  pipeA(fn)((err, results) => {
    assert.deepEqual(results, [1])
    done()
  })
})

it('it supports node callbacks', (assert, done) => {
  const fn = next => next(null, 1)
  pipeA(fn)(done)
})

