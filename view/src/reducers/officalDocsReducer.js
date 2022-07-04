import {
  GET_DOCUMENTS,
  SET_DOCUMENT_LOADING,
  CREATE_DOCUMENTS,
  DELETE_DOCUMENTS,
  CLEAR_DOCUMENT_LOADING
} from "../actions/types";

const initialState = {
  documents: [],
  loading: false
};

export default function officalDocsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOCUMENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_DOCUMENTS:
      return {
        ...state,
        loading: false,
        documents: action.payload
      };
    case CREATE_DOCUMENTS:
      return {
        ...state,
        loading: false,
        documents: [...state.documents, action.payload]
      };
    case DELETE_DOCUMENTS:
      return {
        ...state,
        loading: false,
        documents: state.documents.filter(doc => doc._id !== action.payload._id)
      };
    case CLEAR_DOCUMENT_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
