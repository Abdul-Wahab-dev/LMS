import {
  SET_INTERNSHIP_LOADING,
  CLEAR_INTERNSHIP_LOADING,
  CREATE_INTERNSHIP,
  GET_INTERNSHIPS,
  UPDATE_INTERNSHIP,
  DELETE_INTERNSHIP
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  internships: [],
  loading: false
};

export default function internshipReducer(state = initialState, action) {
  switch (action.type) {
    case SET_INTERNSHIP_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_INTERNSHIP_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_INTERNSHIPS:
      return {
        ...state,
        loading: false,
        internships: action.payload
      };
    case CREATE_INTERNSHIP:
      return {
        ...state,
        loading: false,
        internships: [...state.internships, action.payload]
      };
    case DELETE_INTERNSHIP:
      return {
        ...state,
        loading: false,
        internships: state.internships.filter(
          internship => internship._id !== action.payload._id
        )
      };
    case UPDATE_INTERNSHIP:
      return {
        ...state,
        loading: false,
        internships: state.internships.map(internship =>
          internship._id === action.payload._id ? action.payload : internship
        )
      };
    default:
      return state;
  }
}
