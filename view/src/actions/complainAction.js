import {
  GET_ERRORS,
  GETS_COMPLAINS,
  UPDATE_COMPLAIN,
  DELETE_COMPLAIN,
  CLEAR_COMPLAIN_LOADING,
  SET_COMPLAIN_LOADING
} from "./types";
import { axiosInstance } from "../utils/axiosInstance";
import { logoutUser } from "./authActions";
// @route         GET /api/v1/complains
// @desc          get complains
// @access        Private

export const getComplains = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/complains")
    .then(res => {
      dispatch({
        type: GETS_COMPLAINS,
        payload: res.data.data.complains
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
// @route         GET /api/v1/complains/getComplains
// @desc          get complains
// @access        Private

export const getComplainsForAdmin = () => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .get("/api/v1/complains/getComplains")
    .then(res => {
      dispatch({
        type: GETS_COMPLAINS,
        payload: res.data.data.complains
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

// @route         POST /api/v1/complains
// @desc          Create new complain
// @access        Private

export const createComplain = (complain, clearState) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .post("/api/v1/complains", complain)
    .then(res => {
      clearState();
      dispatch(getComplains());
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

// @route         PATCH /api/v1/complains/:id
// @desc          reply to complain
// @access        Private
export const complainReply = (complain, clearState, setData) => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .patch(`/api/v1/complains/${complain.id}`, { reply: complain.reply })
    .then(res => {
      clearState();
      dispatch({
        type: UPDATE_COMPLAIN,
        payload: res.data.data.complain
      });

      setData(res.data.data.complain);
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

// @route         Patch /api/v1/complains
// @desc          change the complain status
// @access        Private
export const setComplainStatus = complain => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .patch("/api/v1/complains", complain)
    .then(res => {
      dispatch({
        type: UPDATE_COMPLAIN,
        payload: res.data.data.complain
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

// @route         DELETE /api/v1/complains/:id
// @desc          delete complain
// @access        Private
export const deleteComplain = id => dispatch => {
  dispatch(setLoading());
  axiosInstance
    .delete(`/api/v1/complains/${id}`)
    .then(res => {
      if (res) {
        dispatch(clearLoading());
        dispatch({
          type: DELETE_COMPLAIN,
          payload: res.data.data.complain
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
    type: SET_COMPLAIN_LOADING
  };
};

const clearLoading = () => {
  return {
    type: CLEAR_COMPLAIN_LOADING
  };
};
