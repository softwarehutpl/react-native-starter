import { App } from '../app';

// navigation reducer, more info - https://reactnavigation.org/docs/guides/redux
function navigation(state, action) {
  const newState = App.router.getStateForAction(action, state);
  return newState ? newState : state;
}

module.exports = navigation;