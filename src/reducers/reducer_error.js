export default function (state = { message: '' }, action) {
  switch (action.type) {
    case 'ERROR':
      return action.payload;
    default:
      return state;
  }
}
