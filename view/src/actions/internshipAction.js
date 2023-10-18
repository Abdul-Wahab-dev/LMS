import {
  SET_INTERNSHIP_LOADING,
  GET_ERRORS,
  CLEAR_INTERNSHIP_LOADING,
  CREATE_INTERNSHIP,
  GET_INTERNSHIPS,
  UPDATE_INTERNSHIP,
  DELETE_INTERNSHIP
} from "../actions/types";

import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";
// @route         POST /api/v1/internship
// @desc          create internship
// @access        Private

export const createInternship = (internship, clearState) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/internship", internship)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: CREATE_INTERNSHIP,
          payload: res.data.data.internship
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

// @route         GET /api/v1/internship/:program/:batch/:enrollmentNo
// @desc          get internships
// @access        Private
export const getInternships = internship => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get(
      `/api/v1/internship/${internship.program}/${internship.batch}/${internship.enrollmentNo}`
    )
    .then(res => {
      if (res) {
        dispatch({
          type: GET_INTERNSHIPS,
          payload: res.data.data.internships
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

// @route         DElETE /api/v1/internship/:id
// @desc          delete internship
// @access        Private
export const deleteInternships = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/internship/${id}`)
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_INTERNSHIP,
          payload: res.data.data.internship
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

// @route         PATCH /api/v1/internship/:id
// @desc          update internship
// @access        Private
export const updateInternship = (internship, clearState) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .patch(`/api/v1/internship/${internship.id}`, internship)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: UPDATE_INTERNSHIP,
          payload: res.data.data.internship
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
    type: SET_INTERNSHIP_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_INTERNSHIP_LOADING
  };
};
