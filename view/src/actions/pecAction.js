import {
  GET_ERRORS,
  GET_PEC,
  CREATE_PEC,
  UPDATE_PEC,
  DELETE_PEC,
  PEC_MEMBERS,
  SET_PEC_LOADING,
  GET_PEC_DOC_TYPE,
  CREATE_PEC_DOC_TYPE,
  DELETE_PEC_DOC_TYPE,
  CLEAR_PEC_LOADING
} from "./types";
import axios from "axios";
import { logoutUser } from "./authActions";
// @route         CREATE /api/v1/pec/doctype
// @desc          create pec document type
// @access        Private

export const createPECDocType = (data, clearState) => dispatch => {
  axios.post("/api/v1/pec/doctype", data).then(res => {
    dispatch({
      type: CREATE_PEC_DOC_TYPE,
      payload: res.data.data.pecType
    });
    clearState();
  });
};
// @route         GET /api/v1/pec/doctype
// @desc          get pec document type
// @access        Private

export const getPECDocType = () => dispatch => {
  axios.get("/api/v1/pec/doctype").then(res => {
    dispatch({
      type: GET_PEC_DOC_TYPE,
      payload: res.data.data.pecType
    });
  });
};
// @route         DELETE /api/v1/pec/doctype
// @desc          delete pec document type
// @access        Private

export const deletePECDocType = id => dispatch => {
  axios.delete(`/api/v1/pec/doctype/${id}`).then(res => {
    dispatch({
      type: DELETE_PEC_DOC_TYPE,
      payload: res.data.data.pecType
    });
  });
};

// @route         CREATE /api/v1/pec
// @desc          create pec document
// @access        Private
export const createPecDocs = (doc, file, clearState) => dispatch => {
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
    .post("/api/v1/pec", formData, config)
    .then(res => {
      if (res) {
        clearState();
        dispatch(clearLoading());
        dispatch({
          type: CREATE_PEC,
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

// @route         PATCH /api/v1/pec/addwork
// @desc          add pec documnet work
// @access        Private
export const addPECWork = (doc, file, clearState) => dispatch => {
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
    .patch("/api/v1/pec/addwork", formData, config)
    .then(res => {
      if (res) {
        clearState();
        dispatch(clearLoading());
        dispatch({
          type: UPDATE_PEC,
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

// @route         PATCH /api/v1/pec/addremarks
// @desc          add pec documnet remarks
// @access        Private
export const addPECRemarks = (doc, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .patch("/api/v1/pec/addremarks", doc)
    .then(res => {
      if (res) {
        clearState();
        dispatch(clearLoading());
        dispatch({
          type: UPDATE_PEC,
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

// @route         GET /api/v1/pec
// @desc          get pec documents
// @access        Private
export const getDocuments = type => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/v1/pec/${type}`)
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        dispatch({
          type: GET_PEC,
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

// @route         DELETE /api/v1/pec/:id
// @desc          delete pec members
// @access        Private
export const deletePECDocument = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/v1/pec/${id}`)
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        dispatch({
          type: DELETE_PEC,
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

// @route         GET /api/v1/pec/pecDocsMembers
// @desc          get pec members
// @access        Private
export const pecMembersList = () => dispatch => {
  axios
    .get("/api/v1/pec/pecDocsMembers")
    .then(res => {
      dispatch({
        type: PEC_MEMBERS,
        payload: res.data.data.documnets
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
const setLoading = () => {
  return {
    type: SET_PEC_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_PEC_LOADING
  };
};
