// @flow

'use strict';

import type {Gender} from '../types/user';
import type {Action} from '../types/action';

function changeGender(gender: Gender): Action {
  return {
    type: 'CHANGE_GENDER',
    gender: gender,
  }
}

module.exports = {
  changeGender,
};