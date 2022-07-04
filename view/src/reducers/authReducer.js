import isEmpty from "../validation/is-empty";
import {
  SET_CURRENT_USER,
  GET_PROFILE,
  GET_USERS,
  STUDENT_DATA,
  SET_USER_LOADING,
  CLEAR_USER_LOADING,
  APPROVED_USER,
  UPDATE_PERMISSION,
  DELETE_USER,
  UPDATE_USER,
  GET_PROGRAMS,
  GET_USER_DESIGNATIONS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  profile: {},
  user: {},
  users: [],
  studentData: [],
  programs: [],
  loading: false,
  designations: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_USER_LOADING:
      return {
        ...state,
        loading: false,
      };
    case GET_USER_DESIGNATIONS:
      return {
        ...state,
        designations: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        studentData: state.studentData.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
        loading: false,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case STUDENT_DATA:
      return {
        ...state,
        studentData: action.payload,
        loading: false,
      };
    case UPDATE_PERMISSION:
      return {
        ...state,
        loading: false,
        studentData: state.studentData.map((data) =>
          data._id === action.payload._id ? action.payload : data
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        loading: false,
        studentData: state.studentData.filter(
          (user) => user._id !== action.payload._id
        ),
        users: state.users.filter((user) => user._id !== action.payload._id),
      };
    case GET_PROGRAMS:
      return {
        ...state,

        loading: false,
        programs: action.payload,
      };
    case APPROVED_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
        loading: false,
      };
    default:
      return state;
  }
}
