function changeGender(gender) {
  return {
    type: 'CHANGE_GENDER',
    gender: gender,
  }
}

module.exports = {
  changeGender,
};