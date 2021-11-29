import {
  GET_ERRORS,
  GET_CSP,
  DELETE_CSP,
  CSP_MEMBERS,
  UPDATE_CSP,
  SET_CSP_LOADING,
  CLEAR_CSP_LOADING
} from "./types";
import axios from "axios";
import { logoutUser } from "./authActions";

// @route         CREATE /api/v1/csp
// @desc          create CSP
// @access        Private
export const createCSP = (csp, file, clearState) => dispatch => {
  const formData = new FormData();
  formData.append("fileUpload", file);
  formData.append("csp", JSON.stringify(csp));
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  dispatch(setLoading());
  axios
    .post("/api/v1/csp", formData, config)
    .then(res => {
      if (res) {
        clearState();
        dispatch(clearLoading());
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

// @route         PATCH /api/v1/csp/addwork
// @desc          add CSP work
// @access        Private

export const addCSPWork = (csp, file, clearState) => dispatch => {
  const formData = new FormData();

  formData.append("fileUpload", file);
  formData.append("work", JSON.stringify(csp));

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  dispatch(setLoading());
  axios
    .patch("/api/v1/csp/addwork", formData, config)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: UPDATE_CSP,
          payload: res.data.data.csp
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

// @route         GET /api/v1/csp/getCSPMembers
// @desc          get CSP Members
// @access        Private
export const cspMembers = () => dispatch => {
  axios
    .get("/api/v1/csp/getCSPMembers")
    .then(res => {
      dispatch({
        type: CSP_MEMBERS,
        payload: res.data.data.csps
      });
    })
    .catch(err => {
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         PATCH /api/v1/csp/remarks
// @desc          add CSP work remarks
// @access        Private

export const addCSPRemarks = (csp, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .patch("/api/v1/csp/remarks", csp)
    .then(res => {
      if (res) {
        clearState();
        dispatch({
          type: UPDATE_CSP,
          payload: res.data.data.csp
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

// @route         GET /api/v1/csp/:porgram/:batch/:enrollmentNo
// @desc          get CSP
// @access        Private
export const getCSPS = (csp, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/v1/csp/${csp.program}/${csp.batch}/${csp.enrollmentNo}`)
    .then(res => {
      if (res) {
        // clearState();
        dispatch({
          type: GET_CSP,
          payload: res.data.data.csps
        });
        // dispatch(clearLoading());
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

// @route         DELETE /api/v1/csp/:id
// @desc          delete CSP
// @access        Private
export const deleteCSPS = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/v1/csp/${id}`)
    .then(res => {
      if (res) {
        // clearState();
        dispatch({
          type: DELETE_CSP,
          payload: res.data.data.csp
        });
        // dispatch(clearLoading());
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
    type: SET_CSP_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_CSP_LOADING
  };
};
