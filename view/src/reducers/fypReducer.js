import {
  GET_FYP,
  UPDATE_FYP,
  CLEAR_FYP_LOADING,
  SET_FYP_LOADING,
  DELETE_FYP,
  GET_NAMES
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  names: [],
  projects: [],
  loading: false
};

export default function fypReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FYP_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_FYP_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_FYP:
      return {
        ...state,
        loading: false,
        projects: action.payload
      };
    case UPDATE_FYP:
      return {
        ...state,
        loading: false,
        projects: state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        )
      };
    case GET_NAMES:
      return {
        ...state,
        loading: false,
        names: action.payload
      };
    case DELETE_FYP:
      return {
        ...state,
        loading: false,
        projects: state.projects.filter(
          project => project._id !== action.payload._id
        )
      };

    default:
      return state;
  }
}
