import {
  CREATE_SLIDE,
  GET_SLIDES,
  DELETE_SLIDE,
  SET_SLIDER_LOADING,
  CLEAR_SLIDER_LOADING
} from "../actions/types";

const initialState = {
  // isAuthenticated: false,
  // user: {}
  slides: [],
  loading: false
};

export default function sliderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SLIDER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SLIDES:
      return {
        ...state,
        loading: false,
        slides: action.payload
      };
    case CREATE_SLIDE:
      return {
        ...state,
        loading: false,
        slides: [...state.slides, action.payload]
      };
    case DELETE_SLIDE:
      return {
        ...state,
        loading: false,
        slides: state.slides.filter(slide => slide._id !== action.payload._id)
      };
    case CLEAR_SLIDER_LOADING:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
