import {
  GET_ERRORS,
  GET_ASSIGNMENTS,
  CREATE_ASSIGNMENT,
  DELETE_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  CLEAR_ASSIGNMENT_LOADING,
  SET_ASSIGNMENT_LOADING
} from "./types";
import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";

// @route         POST /api/v1/assignment
// @desc          Create new assignment
// @access        Private
export const createAssignment = (assignment, file, clearState) => dispatch => {
  // const formData = new FormData();
  // formData.append("fileUpload", file);
  // formData.append("assignment", JSON.stringify(assignment));
  // const config = {
  //   headers: {
  //     "content-type": "multipart/form-data"
  //   }
  // };
  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/assignment", assignment)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: CREATE_ASSIGNMENT,
          payload: res.data.data.assignment
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

// @route         GET /api/v1/assignment
// @desc          get assignments
// @access        Private
export const getAssignments = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/assignment")
    .then(res => {
      dispatch({
        type: GET_ASSIGNMENTS,
        payload: res.data.data.assignments
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

// @route         DELETE /api/v1/assignment
// @desc          delete assignment
// @access        Private

export const deleteAssignment = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/assignment/${id}`)
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_ASSIGNMENT,
          payload: res.data.data.assignment
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

// @route         PATCH /api/v1/assignment/addwork
// @desc          add work
// @access        Private
export const addwork = (work, file, clearState) => dispatch => {
  dispatch(setLoading());

  axiosInstance
    .patch("/api/v1/assignment/addwork", work)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: UPDATE_ASSIGNMENT,
          payload: res.data.data.assignment
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

// @route         PATCH /api/v1/assignment/remarks
// @desc          add remarks
// @access        Private

export const addRemarks = (remarks, clearState) => dispatch => {
  dispatch(setLoading());

  axiosInstance
    .patch("/api/v1/assignment/addremarks", remarks)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: UPDATE_ASSIGNMENT,
          payload: res.data.data.assignment
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
    type: SET_ASSIGNMENT_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_ASSIGNMENT_LOADING
  };
};
