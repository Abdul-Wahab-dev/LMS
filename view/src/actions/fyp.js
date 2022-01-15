import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_FYP,
  GET_NAMES,
  UPDATE_FYP,
  CLEAR_FYP_LOADING,
  SET_FYP_LOADING,
  DELETE_FYP,
  CREATE_FYP_CATEGORY,
  GET_FYP_CATEGORY,
  DELETE_FYP_CATEGORY
} from "./types";
import axios from "axios";
import { logoutUser } from "./authActions";

// @route         CREATE /api/v1/pec/doctype
// @desc          create pec document type
// @access        Private

export const createFYPCategory = (data, clearState) => dispatch => {
  axios.post("/api/v1/fyp/category", data).then(res => {
    dispatch({
      type: CREATE_FYP_CATEGORY,
      payload: res.data.data.category
    });
    clearState();
  });
};
// @route         GET /api/v1/pec/doctype
// @desc          get pec document type
// @access        Private

export const getFYPCategory = () => dispatch => {
  axios.get("/api/v1/fyp/category").then(res => {
    dispatch({
      type: GET_FYP_CATEGORY,
      payload: res.data.data.category
    });
  });
};
// @route         DELETE /api/v1/pec/doctype
// @desc          delete pec document type
// @access        Private

export const deleteFYPCategory = id => dispatch => {
  axios.delete(`/api/v1/fyp/category/${id}`).then(res => {
    dispatch({
      type: DELETE_FYP_CATEGORY,
      payload: res.data.data.category
    });
  });
};

// @route         GET /api/v1/fyp/:eventName?/:batch?
// @desc          get FYP
// @access        Private
export const getFyp = fyp => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/v1/fyp/${fyp.eventName}/${fyp.batch}`)
    .then(res => {
      dispatch({
        type: GET_FYP,
        payload: res.data.data
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

// @route         PATCH /api/v1/fyp/presentation-status
// @desc          set presentation to active
// @access        Private
export const presentationStatusAction = fyp => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/v1/fyp/presentation-status`, fyp)
    .then(res => {
      dispatch({
        type: UPDATE_FYP,
        payload: res.data.data.fyp
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

// @route         PATCH /api/v1/fyp/:id
// @desc          add FYP remarks
// @access        Private
export const addRemarks = (remarks, id, fypId, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/v1/fyp/${id}/${fypId}`, remarks)
    .then(res => {
      clearState();
      dispatch({
        type: UPDATE_FYP,
        payload: res.data.data.project
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
// @route         PATCH /api/v1/fyp/member
// @desc          add members
// @access        Private
export const addMembersToFYPAct = (data, clearState) => dispatch => {
  dispatch(setLoading());
  dispatch({ type: CLEAR_ERRORS });
  axios
    .patch(`/api/v1/fyp/member`, data)
    .then(res => {
      clearState();
      dispatch({
        type: UPDATE_FYP,
        payload: res.data.data.project
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

// @route         PATCH /api/v1/fyp/ideadelete
// @desc          delete Idea
// @access        Private

export const deleteIdea = data => dispatch => {
  axios
    .patch("/api/v1/fyp/ideadelete", data)
    .then(res => {
      dispatch({
        type: UPDATE_FYP,
        payload: res.data.data.project
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

// @route         CREATE /api/v1/fyp
// @desc          create FYP
// @access        Private
export const createFYP = (fyp, clearState) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/v1/fyp", fyp)
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        dispatch(getProjectNames());
        clearState();
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

// @route         GET /api/v1/fyp/getnames
// @desc          get FYP names
// @access        Private
export const getProjectNames = () => dispatch => {
  axios.get("/api/v1/fyp/getnames").then(res => {
    if (res) {
      dispatch({
        type: GET_NAMES,
        payload: res.data.data.names
      });
    }
  });
};
// @route         DELETE /api/v1/fyp/:id
// @desc          delete FYP
// @access        Private
export const deleteFYP = id => dispatch => {
  dispatch(setLoading());
  axios
    .delete(`/api/v1/fyp/${id}`)
    .then(res => {
      if (res) {
        dispatch({
          type: DELETE_FYP,
          payload: res.data.data.project
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

//  @route          PUT /api/v1/fyp/assign-time
//  @desc           assign presentation time
//  @access         Private
export const assignTimeAction = (data, clearState) => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  try {
    await axios.put("/api/v1/fyp/assign-time", data);
    clearState();
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

// @route           PUT /api/v1/fyp/assign-teacher
// @desc            assign teacher
// @access          Private
export const assignTeacherAction = (data, clearState) => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
  try {
    const res = await axios.put("/api/v1/fyp/assign-teacher", data);
    console.log(res.data);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
const setLoading = () => {
  return {
    type: SET_FYP_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_FYP_LOADING
  };
};
