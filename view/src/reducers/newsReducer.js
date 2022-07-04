import {
  GETS_NEWS_UPDATES,
  SET_NEWS_LOADING,
  CLEAR_NEWS_LOADING,
  DELETE_NEWS_UPDATES
} from "../actions/types";

const initialState = {
  news: [],
  loading: false
};

export default function news(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_NEWS_LOADING:
      return {
        ...state,
        loading: false
      };
    case GETS_NEWS_UPDATES:
      return {
        ...state,
        loading: false,
        news: action.payload
      };
    case DELETE_NEWS_UPDATES:
      return {
        ...state,
        loading: false,
        news: state.news.filter(news => news._id !== action.payload._id)
      };
    default:
      return state;
  }
}
