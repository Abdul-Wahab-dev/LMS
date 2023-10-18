import {
  GET_ERRORS,
  GETS_NEWS_UPDATES,
  DELETE_NEWS_UPDATES,
  SET_NEWS_LOADING,
  CLEAR_NEWS_LOADING
} from "./types";
import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";
// @route         GET /api/v1/news
// @desc          get News
// @access        Private
export const getNews = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/news")
    .then(res => {
      dispatch({
        type: GETS_NEWS_UPDATES,
        payload: res.data.data.newsandupdates
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

// @route         CREATE /api/v1/news
// @desc          create News
// @access        Private
export const createNews = (news, clearState) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/news", news)
    .then(res => {
      clearState();
      dispatch(getNews());
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

// @route         DELETE /api/v1/news/:id
// @desc          delete News
// @access        Private

export const deleteNews = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/news/${id}`)
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_NEWS_UPDATES,
          payload: res.data.data.news
        });
      }
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
    type: SET_NEWS_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_NEWS_LOADING
  };
};
