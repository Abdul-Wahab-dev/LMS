import {
  GET_PEC,
  CREATE_PEC,
  UPDATE_PEC,
  DELETE_PEC,
  SET_PEC_LOADING,
  GET_PEC_DOC_TYPE,
  CREATE_PEC_DOC_TYPE,
  DELETE_PEC_DOC_TYPE,
  PEC_MEMBERS,
  CLEAR_PEC_LOADING
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  documents: [],
  members: [],
  pecDocType: [],
  loading: false
};

export default function officalDocsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PEC_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PEC:
      return {
        ...state,
        loading: false,
        documents: action.payload
      };
    case CREATE_PEC:
      return {
        ...state,
        loading: false,
        documents: [...state.documents, action.payload]
      };
    case DELETE_PEC:
      return {
        ...state,
        loading: false,
        documents: state.documents.filter(doc => doc._id !== action.payload._id)
      };
    case UPDATE_PEC:
      return {
        ...state,
        loading: false,
        documents: state.documents.map(doc =>
          doc._id === action.payload._id ? action.payload : doc
        )
      };
    case PEC_MEMBERS:
      return {
        ...state,
        members: action.payload
      };
    case CREATE_PEC_DOC_TYPE:
      return {
        ...state,
        pecDocType: [...state.pecDocType, action.payload]
      };
    case GET_PEC_DOC_TYPE:
      return {
        ...state,
        pecDocType: action.payload
      };
    case DELETE_PEC_DOC_TYPE:
      return {
        ...state,
        pecDocType: state.pecDocType.filter(
          type => type._id !== action.payload._id
        )
      };
    case CLEAR_PEC_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
