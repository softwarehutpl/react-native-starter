// @flow

'use strict';

import { App } from '../app';
import type {Action} from '../types/action';

type State = {}

// navigation reducer, more info - https://reactnavigation.org/docs/guides/redux
function navigation(state: State, action: Action) {
  const newState = App.router.getStateForAction(action, state);
  return newState ? newState : state;
}

module.exports = navigation;