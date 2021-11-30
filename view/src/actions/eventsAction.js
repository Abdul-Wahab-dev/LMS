import {
  CREATE_EVENT,
  DELETE_EVENT,
  GET_PRIVATE_EVENTS,
  GET_ERRORS,
  CLEAR_EVENT_LOADING,
  SET_EVENT_LOADING,
  UPDATE_EVENT
} from "./types";
import axios from "axios";
import { logoutUser } from "./authActions";
// @route         POST /api/v1/event
// @desc          create event
// @access        Private
export const createEvent = (eve, file, clearState) => dispatch => {
  const formData = new FormData();

  formData.append("fileUpload", file);
  formData.append("event", JSON.stringify(eve));

  const config = {
    headers: {
      "content-type": "multipart/form-data"
    }
  };
  dispatch(setLoading());
  axios
    .post("/api/v1/event", formData, config)
    .then(res => {
      clearState();
      dispatch({
        type: CREATE_EVENT,
        payload: res.data.data.event
      });
    })
    .catch(err => {
      dispatch(clearLoading);
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         get /api/v1/event/private
// @desc          get Events
// @access        Private
export const getPrivateEvents = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/v1/event/private")
    .then(res => {
      dispatch({
        type: GET_PRIVATE_EVENTS,
        payload: res.data.data.events
      });
    })
    .catch(err => {
      dispatch(clearLoading);
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
// @route         get /api/v1/event/public
// @desc          get Events
// @access        Public
export const getPublicEvents = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/v1/event/public")
    .then(res => {
      dispatch({
        type: GET_PRIVATE_EVENTS,
        payload: res.data.data.events
      });
    })
    .catch(err => {
      dispatch(clearLoading);
      if (err.response.data.message === "jwt expired") {
        dispatch(logoutUser());
      }
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// @route         PATCH /api/v1/event/:id
// @desc          set to display event on Landing Page
// @access        Private
export const setDisplay = eve => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/v1/event/${eve.id}`, { display: eve.display })
    .then(res => {
      dispatch({
        type: UPDATE_EVENT,
        payload: res.data.data.event
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

// @route         DELETE /api/v1/event/:id
// @desc          delete Event
// @access        Private
export const deleteEvent = id => dispatch => {
  dispatch(setLoading());
  axios
    .patch(`/api/v1/event/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EVENT,
        payload: res.data.data.event
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
    type: SET_EVENT_LOADING
  };
};
const clearLoading = () => {
  return {
    type: CLEAR_EVENT_LOADING
  };
};
