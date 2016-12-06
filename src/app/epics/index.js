import { combineEpics } from 'redux-observable'
import routerEpic from '@content/app/epics/router'

export default combineEpics(
  routerEpic
)
