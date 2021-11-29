import {
  UPDATE_CSP,
  GET_CSP,
  DELETE_CSP,
  CSP_MEMBERS,
  SET_CSP_LOADING,
  CLEAR_CSP_LOADING
} from "../actions/types";

const initialState = {
  csps: [],
  members: [],
  loading: false
};

export default function cspReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CSP_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_CSP_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_CSP:
      return {
        ...state,
        loading: false,
        csps: action.payload
      };
    case UPDATE_CSP:
      return {
        ...state,
        loading: false,
        csps: state.csps.map(csp =>
          csp._id === action.payload._id ? action.payload : csp
        )
      };

    case CSP_MEMBERS:
      return {
        ...state,
        members: action.payload
      };
    case DELETE_CSP:
      return {
        ...state,
        loading: false,
        csps: state.csps.filter(csp => csp._id !== action.payload._id)
      };
    default:
      return state;
  }
}
