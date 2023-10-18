import {
  GET_ERRORS,
  CREATE_SLIDE,
  GET_SLIDES,
  DELETE_SLIDE,
  SET_SLIDER_LOADING,
  CLEAR_SLIDER_LOADING
} from "./types";
import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";

export const createSlide = (slide, file, clearState) => dispatch => {
  // const formData = new FormData();
  // formData.append("fileUpload", file);
  // formData.append("slide", JSON.stringify(slide));
  // const config = {
  //   headers: {
  //     "content-type": "multipart/form-data"
  //   }
  // };

  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/slider", slide)
    .then(res => {
      dispatch({
        type: CREATE_SLIDE,
        payload: res.data.data.slide
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

export const getSlides = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/slider")
    .then(res => {
      dispatch({
        type: GET_SLIDES,
        payload: res.data.data.slides
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

export const deleteSlide = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/slider/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_SLIDE,
        payload: res.data.data.slide
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
    type: SET_SLIDER_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_SLIDER_LOADING
  };
};
