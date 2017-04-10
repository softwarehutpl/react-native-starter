function user(state={ gender: 'male' }, action) {
  if (action.type === 'CHANGE_GENDER') {
    return {
      ...state,
      gender: action.gender
    } 
  }
  return state;
}

module.exports = user;