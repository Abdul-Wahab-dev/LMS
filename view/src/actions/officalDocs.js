import {
  GET_ERRORS,
  GET_DOCUMENTS,
  SET_DOCUMENT_LOADING,
  CREATE_DOCUMENTS,
  DELETE_DOCUMENTS,
  CLEAR_DOCUMENT_LOADING
} from "./types";
import axios from "axios";
import { logoutUser } from "./authActions";
// @route         CREATE /api/v1/officalDocs
// @desc          create offical document
// @access        Private
export const createDocs = (doc, file, clearState) => dispatch => {
  const formData = new FormData();
  formData.append("fileUpload", file);
  formData.append("doc", JSON.stringify(doc));
  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };

  dispatch(setLoading());
  axios
    .post("/api/v1/officalDocs", formData, config)
    .then(res => {
      if (res) {
        clearState();
        dispatch(clearLoading());
        dispatch({
          type: CREATE_DOCUMENTS,
          payload: res.data.data.document
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

// @route         GET /api/v1/officalDocs
// @desc          get offical documents
// @access        Private
export const getDocuments = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/v1/officalDocs")
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        dispatch({
          type: GET_DOCUMENTS,
          payload: res.data.data.documents
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

// @route         DELETE /api/v1/officalDocs
// @desc          delete offical document
// @access        Private
export const deleteOfficalDoc = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/v1/officalDocs/${id}`)
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        dispatch({
          type: DELETE_DOCUMENTS,
          payload: res.data.data.document
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
    type: SET_DOCUMENT_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_DOCUMENT_LOADING
  };
};
