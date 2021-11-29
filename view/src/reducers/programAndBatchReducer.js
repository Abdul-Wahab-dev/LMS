import {
  GET_PROGRAMS_,
  GET_BATCHS,
  CREATE_PROGRAM,
  CREATE_BATCH,
  DELETE_PROGRAMS,
  DELETE_BATCH,
  CLEAR_PROGRAM_LOADING,
  SET_PROGRAM_LOADING
} from "../actions/types";

const initialState = {
  programs: [],
  batchs: [],
  loading: false
};

export default function programAndBatchReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRAM_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_PROGRAM_LOADING:
      return {
        ...state,
        loading: false
      };
    case CREATE_PROGRAM:
      return {
        ...state,
        loading: false,
        programs: [...state.programs, action.payload]
      };
    case DELETE_PROGRAMS:
      return {
        ...state,
        loading: false,
        programs: state.programs.filter(
          program => program._id !== action.payload._id
        )
      };
    case GET_PROGRAMS_:
      return {
        ...state,
        loading: true,
        programs: action.payload
      };
    case GET_BATCHS:
      return {
        ...state,
        loading: true,
        batchs: action.payload
      };
    case CREATE_BATCH:
      return {
        ...state,
        loading: false,
        batchs: [...state.batchs, action.payload]
      };
    case DELETE_BATCH:
      return {
        ...state,
        loading: false,
        batchs: state.batchs.filter(batch => batch._id !== action.payload._id)
      };
    default:
      return state;
  }
}
