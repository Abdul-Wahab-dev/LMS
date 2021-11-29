import {
  GET_QUOTE,
  CREATE_QUOTE,
  DELETE_QUOTE,
  UPDATE_QUOTE,
  SET_QUOTE_LOADING,
  CLEAR_QUOTE_LOADING
} from "../actions/types";

const initialState = {
  quotes: [],
  loading: false
};

export default function quoteReducer(state = initialState, action) {
  switch (action.type) {
    case SET_QUOTE_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_QUOTE_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_QUOTE:
      return {
        ...state,
        loading: false,
        quotes: action.payload
      };

    case CREATE_QUOTE:
      return {
        ...state,
        loading: false,
        quotes: [...state.quotes, action.payload]
      };
    case DELETE_QUOTE:
      return {
        ...state,
        loading: false,
        quotes: state.quotes.filter(eve => eve._id !== action.payload._id)
      };
    case UPDATE_QUOTE:
      return {
        ...state,
        loading: false,
        quotes: state.quotes.map(eve =>
          eve._id === action.payload._id ? action.payload : eve
        )
      };

    default:
      return state;
  }
}
