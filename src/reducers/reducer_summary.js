export default function SummaryReducer(state = {}, action) {
  switch(action.type) {
    case 'SUMMARY':
      return action.payload
  }
  return state;
};
