import {
  GETS_COMPLAINS,
  UPDATE_COMPLAIN,
  CLEAR_COMPLAIN_LOADING,
  SET_COMPLAIN_LOADING,
  DELETE_COMPLAIN
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  complains: [],
  loading: false
};

export default function complainsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPLAIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_COMPLAIN_LOADING:
      return {
        ...state,
        loading: false
      };
    case GETS_COMPLAINS:
      return {
        ...state,
        loading: false,
        complains: action.payload
      };
    case UPDATE_COMPLAIN:
      return {
        ...state,
        loading: false,
        complains: state.complains.map(complain =>
          complain._id === action.payload._id ? action.payload : complain
        )
      };
    case DELETE_COMPLAIN:
      return {
        ...state,
        loading: false,
        complains: state.complains.filter(
          complain => complain._id !== action.payload._id
        )
      };
    default:
      return state;
  }
}
