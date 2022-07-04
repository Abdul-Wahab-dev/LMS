import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  GET_PUBLIC_EVENTS,
  CLEAR_EVENT_LOADING,
  SET_EVENT_LOADING,
  GET_PRIVATE_EVENTS
} from "../actions/types";

const initialState = {
  publicEvents: [],
  privateEvents: [],
  loading: false
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EVENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_EVENT_LOADING:
      return {
        ...state,
        loading: false
      };
    case GET_PUBLIC_EVENTS:
      return {
        ...state,
        loading: false,
        publicEvents: action.payload
      };
    case GET_PRIVATE_EVENTS:
      return {
        ...state,
        loading: false,
        privateEvents: action.payload
      };
    case CREATE_EVENT:
      return {
        ...state,
        loading: false,
        privateEvents: [...state.privateEvents, action.payload]
      };
    case DELETE_EVENT:
      return {
        ...state,
        loading: false,
        privateEvents: state.privateEvents.filter(
          eve => eve._id !== action.payload._id
        )
      };
    case UPDATE_EVENT:
      return {
        ...state,
        loading: false,
        privateEvents: state.privateEvents.map(eve =>
          eve._id === action.payload._id ? action.payload : eve
        )
      };

    default:
      return state;
  }
}
