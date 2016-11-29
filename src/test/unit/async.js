import assert from 'assert'
import sinon from 'sinon'
import specHelper from '../specHelper'
import { pipeA } from '../../app/async'

describe('async', () => {
  describe('pipeA', () => {
    it('passes error', (done) => {
      const fn = (_, next) => next(new Error('lol'))
      pipeA(fn)(err => {
        assert.deepEqual(err, new Error('lol'))
        done()
      })
    })

    it('passes results', (done) => {
      const fn = (_, next) => next(null, 1)
      pipeA(fn)((err, results) => {
        assert.deepEqual(results, [1])
        done()
      })
    })

    it('it supports node callbacks', (done) => {
      const fn = next => next(null, 1)
      pipeA(fn)(done)
    })
  })
})

