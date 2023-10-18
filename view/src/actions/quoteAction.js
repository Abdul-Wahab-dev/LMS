import {
  GET_QUOTE,
  CREATE_QUOTE,
  DELETE_QUOTE,
  UPDATE_QUOTE,
  SET_QUOTE_LOADING,
  CLEAR_QUOTE_LOADING,
  GET_ERRORS
} from "./types";
import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";

// @route         POST /api/v1/quote
// @desc          create quote
// @access        Private
export const createQuote = (quote, clearState) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/quote", quote)
    .then(res => {
      dispatch({
        type: CREATE_QUOTE,
        payload: res.data.data.quote
      });
      clearState();
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// @route         GET /api/v1/quote
// @desc          get quotes
// @access        Public
export const getQuotes = quote => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/quote")
    .then(res => {
      dispatch({
        type: GET_QUOTE,
        payload: res.data.data.quotes
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// @route         PATCH /api/v1/quote/:id
// @desc          update quotes
// @access        Private
export const updateQuote = quote => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .patch(`/api/v1/quote/${quote.id}`, { display: quote.display })
    .then(res => {
      dispatch({
        type: UPDATE_QUOTE,
        payload: res.data.data.quote
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// @route         DELETE /api/v1/quote/:id
// @desc          DELETE quotes
// @access        Private
export const deleteQuote = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/quote/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_QUOTE,
        payload: res.data.data.quote
      });
    })
    .catch(err => {
      dispatch(clearLoading());
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

const setLoading = () => {
  return {
    type: SET_QUOTE_LOADING
  };
};
const clearLoading = () => {
  return {
    type: CLEAR_QUOTE_LOADING
  };
};
