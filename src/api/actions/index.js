import { curry } from '@vikfroberg/func'

export const log = msg => ({
  type: 'LOG',
  payload: msg,
})
log.toString = () => 'LOG'
