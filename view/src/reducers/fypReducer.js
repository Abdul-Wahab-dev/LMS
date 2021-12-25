import {
  GET_FYP,
  UPDATE_FYP,
  CLEAR_FYP_LOADING,
  SET_FYP_LOADING,
  DELETE_FYP,
  GET_NAMES,
  CREATE_FYP_CATEGORY,
  DELETE_FYP_CATEGORY,
  GET_FYP_CATEGORY
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  names: [],
  projects: [],
  category: [],
  memberExist: false,
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
        projects: action.payload.projects,
        memberExist: action.payload.memberExist
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

    case CREATE_FYP_CATEGORY:
      return {
        ...state,
        category: [...state.category, action.payload]
      };
    case GET_FYP_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case DELETE_FYP_CATEGORY:
      return {
        ...state,
        category: state.category.filter(type => type._id !== action.payload._id)
      };

    default:
      return state;
  }
}
