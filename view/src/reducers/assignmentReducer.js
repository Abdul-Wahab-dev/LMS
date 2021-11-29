import {
  GET_ASSIGNMENTS,
  CREATE_ASSIGNMENT,
  CLEAR_ASSIGNMENT_LOADING,
  UPDATE_ASSIGNMENT,
  SET_ASSIGNMENT_LOADING,
  DELETE_ASSIGNMENT
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  assignments: [],
  loading: false
};

export default function assignmentReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ASSIGNMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_ASSIGNMENT_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_ASSIGNMENTS:
      return {
        ...state,
        loading: false,
        assignments: action.payload
      };
    case CREATE_ASSIGNMENT:
      return {
        ...state,
        loading: false,
        assignments: [...state.assignments, action.payload]
      };
    case DELETE_ASSIGNMENT:
      return {
        ...state,
        loading: false,
        assignments: state.assignments.filter(
          assignment => assignment._id !== action.payload._id
        )
      };
    case UPDATE_ASSIGNMENT:
      return {
        ...state,
        loading: false,
        assignments: state.assignments.map(assignment =>
          assignment._id === action.payload._id ? action.payload : assignment
        )
      };
    default:
      return state;
  }
}
